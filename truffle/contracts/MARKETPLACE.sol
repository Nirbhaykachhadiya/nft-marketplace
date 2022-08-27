//SPDX-License-Identifier:MIT
pragma solidity >=0.5.0<0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MARKETPLACE is ReentrancyGuard{

    address payable public immutable feeAccount;
    uint public immutable feePercent;

    constructor(){
        feePercent=10;
        feeAccount=payable(msg.sender);
    }

    uint public itemCount;

    struct Item{
        uint itemId;
        IERC721 NFT;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }

    mapping(uint=>Item)public Items;


    function makeItem(IERC721 _NFT,uint _tokenId,uint _price)external nonReentrant{
        require(_price>0);
        itemCount++;
        _NFT.transferFrom(msg.sender,address(this),_tokenId);
        Items[itemCount]=Item(itemCount,_NFT,_tokenId,_price,payable(msg.sender),false);


    }

    function getTotalPrice(uint _itemId)view public returns(uint){

       return((Items[_itemId].price*(100 + feePercent))/100);
    }


    function purchaseItem(uint _itemId)external payable nonReentrant{
        uint _totalPrice=getTotalPrice(_itemId);
        Item storage item = Items[_itemId];
        require(_itemId>0 && _itemId<=itemCount,"item it not set");
        require(msg.value>=_totalPrice,"price issue");
        require(!item.sold);
        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);
        item.sold=true;
         item.NFT.transferFrom(address(this), msg.sender, item.tokenId);

    }

}