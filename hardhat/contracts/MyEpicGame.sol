//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

// Helper we wrote to encode in Base64
import "./libraries/Base64.sol";

// Our contract inherits from ERC721, which is the standard NFT contract!
contract MyEpicGame is ERC721 {
    struct Stats {
        uint hp;
        uint maxHp;
        uint attackDamage;
    }

    struct CharacterAttributes {
        uint characterIndex;
        string name;
        string imageURI;
        Stats stats;
        uint level;
        uint experience;
        uint totalExperience;
    }

    // The tokenId is the NFTs unique identifier, it's just a number that goes
    // 0, 1, 2, 3, etc.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    CharacterAttributes[] defaultCharacters;

    // We create a mapping from the nft's tokenId => that NFTs attributes.
    mapping(uint256 => CharacterAttributes) public nftHolderAttributes;

    struct BigBoss {
        string name;
        string imageURI;
        Stats stats;
        uint level;
        uint experience;
        uint totalExperience;
    }

    BigBoss public bigBoss;

    // A mapping from an address => the NFTs tokenId.
    mapping(address => uint256) public nftHolders;
    address[] public listNftHolders;
    mapping(address => CharacterAttributes[]) public charactersOfAddress;

    event CharacterNFTMinted(address sender, uint256 tokenId, uint256 characterIndex);
    event AttackComplete(uint newBossHp, uint newPlayerHp);
    event PlayerWin();
    event PlayerLose();
    event LevelUp(uint level, Stats stats);

    constructor(
        string[] memory characterNames,
        uint[] memory characterIndexes,
        string[] memory characterImageURIs,
        uint[] memory characterHp,
        uint[] memory characterAttackDmg,
        string memory bossName,
        string memory bossImageURI,
        uint bossHp,
        uint bossAttackDamage
    )
        ERC721("Pokemon", "PKM")
    {

        bigBoss = BigBoss({
            name: bossName,
            imageURI: bossImageURI,
            stats: Stats({
                hp: bossHp,
                maxHp: bossHp,
                attackDamage: bossAttackDamage
            }),
            level: 10,
            experience: 0,
            totalExperience: 399
        });

        console.log("Done initializing boss %s w/ HP %s, img %s", bigBoss.name, bigBoss.stats.hp, bigBoss.imageURI);

        for(uint i = 0; i < characterNames.length; i += 1) {
            defaultCharacters.push(CharacterAttributes({
                characterIndex: characterIndexes[i],
                name: characterNames[i],
                imageURI: characterImageURIs[i],
                stats: Stats({
                    hp: characterHp[i],
                    maxHp: characterHp[i],
                    attackDamage: characterAttackDmg[i]
                }),
                level: 1,
                experience: 0,
                totalExperience: 0
            }));

            CharacterAttributes memory c = defaultCharacters[i];

            // Hardhat's use of console.log() allows up to 4 parameters in any order of following types: uint, string, bool, address
            console.log("Done initializing %s w/ HP %s, img %s", c.name, c.stats.hp, c.imageURI);
        }

        // I increment _tokenIds here so that my first NFT has an ID of 1.
        // More on this in the lesson!
        _tokenIds.increment();
    }

    // Users would be able to hit this function and get their NFT based on the
    // characterId they send in!
    function mintCharacterNFT(uint _characterIndex) external {
        // Get current tokenId (starts at 1 since we incremented in the constructor).
        uint256 newItemId = _tokenIds.current();

        // The magical function! Assigns the tokenId to the caller's wallet address.
        _safeMint(msg.sender, newItemId);

        // We map the tokenId => their character attributes. More on this in
        // the lesson below.
        nftHolderAttributes[newItemId] = CharacterAttributes({
            characterIndex: _characterIndex,
            name: defaultCharacters[_characterIndex - 1].name,
            imageURI: defaultCharacters[_characterIndex - 1].imageURI,
            stats: Stats({
                hp: defaultCharacters[_characterIndex - 1].stats.hp,
                maxHp: defaultCharacters[_characterIndex - 1].stats.maxHp,
                attackDamage: defaultCharacters[_characterIndex - 1].stats.attackDamage
            }),
            level: 1,
            experience: 0,
            totalExperience: 0
        });

        console.log("Minted NFT w/ tokenId %s and characterIndex %s", newItemId, _characterIndex);

        // Keep an easy way to see who owns what NFT.
        nftHolders[msg.sender] = newItemId;
        charactersOfAddress[msg.sender].push(nftHolderAttributes[newItemId]);
        listNftHolders.push(msg.sender);

        // Increment the tokenId for the next person that uses it.
        _tokenIds.increment();

        emit CharacterNFTMinted(msg.sender, newItemId, _characterIndex);
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        CharacterAttributes memory charAttributes = nftHolderAttributes[_tokenId];

        string memory strHp = Strings.toString(charAttributes.stats.hp);
        string memory strMaxHp = Strings.toString(charAttributes.stats.maxHp);
        string memory strAttackDamage = Strings.toString(charAttributes.stats.attackDamage);
        string memory strLevel = Strings.toString(charAttributes.level);
        string memory strTokenId = Strings.toString(_tokenId);

        string memory json = Base64.encode(
            abi.encodePacked(
            '{"name": "',charAttributes.name,' #: ',strTokenId,'",',
            '"description": "This is an NFT that lets people play in the game Pokemon NFT!"',
            '"image": "',charAttributes.imageURI,'",',
            '"attributes": [',
            '{ "trait_type": "Health Points", "value": ',strHp,', "max_value":',strMaxHp,'},',
            '{ "trait_type": "Attack Damage", "value": ',strAttackDamage,'},',
            '{ "trait_type": "Level", "value":', strLevel,'} ]}'
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }

    function updateStats(CharacterAttributes storage player) internal {
        for(uint i = 0; i < charactersOfAddress[msg.sender].length; i += 1) {
            if(charactersOfAddress[msg.sender][i].characterIndex == player.characterIndex) {
                charactersOfAddress[msg.sender][i] = player;
            }
        }
    }

    function experienceNextLevel(uint level) internal pure returns (uint) {
        uint required_xp = (4 * (level ** 3) / 100) + (8 * (level ** 2) / 10) + 2 * level;
        return required_xp;
    }

    function checkLevelUp(CharacterAttributes storage player) internal {
        player.totalExperience += player.experience;

        // Check if can levelUp
        if(player.experience >= experienceNextLevel(player.level)) {
            console.log("Level Up:", player.level, " - Total Experience: ", player.totalExperience);
            player.experience -= experienceNextLevel(player.level);
            player.stats.maxHp += 1;
            player.stats.attackDamage += 1;
            player.level++;
            emit LevelUp(player.level, player.stats);
        }
    }

    function attackBoss() public {
        // Get the state of the player's NFT.
        uint256 nftTokenIdOfPlayer = nftHolders[msg.sender];
        CharacterAttributes storage player = nftHolderAttributes[nftTokenIdOfPlayer];

        console.log("\nPlayer w/ character %s about to attack. Has %s HP and %s AD", player.name, player.stats.hp, player.stats.attackDamage);
        console.log("Boss %s has %s HP and %s AD", bigBoss.name, bigBoss.stats.hp, bigBoss.stats.attackDamage);

        // Make sure the player has more than 0 HP.
        require (
            player.stats.hp > 0,
            "Error: character must have HP to attack boss."
        );

        // Make sure the boss has more than 0 HP.
        require (
            bigBoss.stats.hp > 0,
            "Error: boss must have HP to attack boss."
        );

        // Allow player to attack boss.
        if (bigBoss.stats.hp < player.stats.attackDamage) {
            bigBoss.stats.hp = 0;
            emit PlayerWin();
        } else {
            bigBoss.stats.hp = bigBoss.stats.hp - player.stats.attackDamage;
            player.experience += 8 * bigBoss.level;
        }

        // Allow boss to attack player.
        if (player.stats.hp < bigBoss.stats.attackDamage) {
            player.stats.hp = 0;
            emit PlayerLose();
        } else {
            player.stats.hp = player.stats.hp - bigBoss.stats.attackDamage;
        }

        checkLevelUp(player);


        // Console for ease.
        console.log("Player attacked boss. New boss hp: %s", bigBoss.stats.hp);
        console.log("Boss attacked player. New player hp: %s\n", player.stats.hp);

        emit AttackComplete(bigBoss.stats.hp, player.stats.hp);
        updateStats(player);
    }

    function checkIfUserHasNFT() public view returns (CharacterAttributes memory) {
        // Get the tokenId of the user's character NFT
        uint256 userNftTokenId = nftHolders[msg.sender];
        // If the user has a tokenId in the map, return their character.
        if (userNftTokenId > 0) {
            return nftHolderAttributes[userNftTokenId];
        }
        // Else, return an empty character.
        else {
            CharacterAttributes memory emptyStruct;
            return emptyStruct;
        }
    }

    function getAllDefaultCharacters() public view returns (CharacterAttributes[] memory) {
        return defaultCharacters;
    }

    function getCharacters(address sender) public view returns (CharacterAttributes[] memory) {
        return charactersOfAddress[sender];
    }

    function getBigBoss() public view returns (BigBoss memory) {
        return bigBoss;
    }

    function getListNftHolders() public view returns(address[] memory) {
        return listNftHolders;
    }
}
