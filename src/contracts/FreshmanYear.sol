// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/finance/PaymentSplitter.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract FreshmanYear is ERC721Enumerable, Ownable, PaymentSplitter, ReentrancyGuard {
    using Strings for uint256;
    string public baseURI;

    //settings
    uint256 public maxSupply = 305;
    bool public whitelistStatus = false;
    bool public publicStatus = false;
    mapping(address => uint256) public onWhitelist;

    //prices
    uint256 private price = 0.1 ether;

    //maxmint
    uint256 public maxMint = 10;

    //shares
    address[] private addressList = [
        0x67B6a6a88de218114eA2a58F5970CCC712156247,
        0x1eC0EA2C067E5e87Fca9c54E4EEf140410189789
    ];
    uint[] private shareList = [50,50]; 

    //token
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI
    )
    
    ERC721(_name, _symbol)
        PaymentSplitter(addressList, shareList){
        setURI(_initBaseURI);
    }

    // public minting
    function mintPublic(uint256 _tokenAmount) public payable {
        uint256 s = totalSupply();
        require(publicStatus, "Public sale is not active" );
        require(msg.sender.balance > 0 ether, "You  Broke");
        require(_tokenAmount > 0, "Mint more than 0" );
        require(_tokenAmount <= maxMint, "Mint less");
        require( s + _tokenAmount <= maxSupply, "Mint less");
        require(msg.value >= price * _tokenAmount, "ETH input is wrong");

        for (uint256 i = 0; i < _tokenAmount; ++i) {
            _safeMint(msg.sender, s + i, "");
        }
        delete s;
    }

    // whitelist minting
    function mintWhitelist(uint256 _tokenAmount) public payable {
        uint256 s = totalSupply();
        uint256 wl = onWhitelist[msg.sender];

        require(whitelistStatus, "Whitelist is not active" );
        require(_tokenAmount > 0, "Mint more than 0" );
        require(_tokenAmount <= maxMint, "Mint less");
        require( s + _tokenAmount <= maxSupply, "Mint less");
        require(msg.value >= price * _tokenAmount, "ETH input is wrong");
        require(wl > 0);
        delete wl;
        for (uint256 i = 0; i < _tokenAmount; ++i) {
            _safeMint(msg.sender, s + i, "");
        }
        delete s;
    }

    // admin minting
    function gift(uint[] calldata gifts, address[] calldata recipient) external onlyOwner {
        require(gifts.length == recipient.length);
        uint g = 0;
        uint256 s = totalSupply();
        for(uint i = 0; i < gifts.length; ++i){
            g += gifts[i];
        }
        require( s + g <= maxSupply, "Too many" );
        delete g;
        for(uint i = 0; i < recipient.length; ++i){
            for(uint j = 0; j < gifts[i]; ++j){
               _safeMint( recipient[i], s++, "" );
            }
        }
        delete s;   
    }
  
    // admin functionality
    function whitelistSet(address[] calldata _addresses) public onlyOwner {
        for(uint256 i; i < _addresses.length; i++){
            onWhitelist[_addresses[i]] = maxMint;
        }
    }

    //read metadata
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(tokenId <= maxSupply);
        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI, tokenId.toString())) : "";
    }

    //price switch
    function setPrice(uint256 _newPrice) public onlyOwner {
        price = _newPrice;
    }

    function getPrice() public view returns (uint256) {
        return price;
    }

    //max switch
    function setMax(uint256 _newMaxMintAmount) public onlyOwner {
        maxMint = _newMaxMintAmount;
    }
    
    //write metadata
    function setURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    //onoff switch
    function setWL(bool _wlstatus) public onlyOwner {
        whitelistStatus = _wlstatus;
    }

    function setP(bool _pstatus) public onlyOwner {
        publicStatus = _pstatus;
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success);
    }
}