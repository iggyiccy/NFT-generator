// SPDX-License-Identifier: MIT
// Contract address: 0x4e42C636D1AEd10815baF2aC42639CCFD1202E87
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./interfaces/CardInterface.sol";

contract CardRegistry is ERC721 {
  
  // Track all cards in an array
  address[] public cards;

  // Mapping between card ID and its address
  mapping (uint256 => address) public cardIDtoAddress;

  // Mapping between card address and its ID
  mapping (address => uint256) public cardAddressToID;

  // Register the claiming fee amount for each card
  mapping (address => uint256) public claimingFee;

  // Register the claiming fee recipient for each card
  mapping (address => address) public feeRecipient;

  // Events
  event CardRegistered(address indexed cardAddress, uint256 indexed cardID, uint256 indexed feeAmount, address feeRecipient);

  constructor() ERC721("CardRegistry", "Card") {}

  /**
   * @notice Will add a new loot card contract in the registry
   * @param _cardAddress Address of the card contract to add to registry
   */
  function registerCard(address _cardAddress) external {
    require(
      cardAddressToID[_cardAddress] == 0, 
      "CardRegistry#registerCard: Card already registered"
    );

    // Check if contract implements CardTokenUri and if it returns anything
    try ICard(_cardAddress).CardTokenUri(1) returns (string memory _uri) {
      require(bytes(_uri).length > 0, "CardRegistry#registerCard: Card doesn't support CardTokenUri");
    } catch {
      revert("CardRegistry#registerCard: Card doesn't support CardTokenUri");
    }
     
    // Register card information
    cards.push(_cardAddress);
    uint256 cardID = cards.length;
    cardIDtoAddress[cardID] = _cardAddress;
    cardAddressToID[_cardAddress] = cardID;

    // Try see if card implements a fee
    try ICard(_cardAddress).claimFeeAmount() returns (uint256 _fee) {
      claimingFee[_cardAddress] = _fee;
      feeRecipient[_cardAddress] = ICard(_cardAddress).claimFeeRecipient();
    } catch {
      // Do nothing 
    }

    // Emit event of card registration
    emit CardRegistered(_cardAddress, cardID, claimingFee[_cardAddress] , feeRecipient[_cardAddress]);
  }

  /**
   * @notice Return array of all cards registered
   */
  function getCards() external view returns (address[] memory) {
    return cards;
  }

}