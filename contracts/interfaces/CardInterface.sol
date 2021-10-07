// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICard {
  // To signal being a card contract
  function CardTokenUri(uint256 cardId) external view returns (string memory tokenUri);

  // Returns the fee the card is charging per claim
  function claimFeeAmount() external view returns (uint256 feeAmount);

  // Returns the address to which the fee should be sent to
  function claimFeeRecipient() external view returns (address feeRecipient);

  // Return the maximum supply for this card. If none, return 2**256-1
  function maxSupply() external view returns (uint256 cardMaxSupply);
}