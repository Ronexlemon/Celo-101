// SPDX-License-Identifier: MIT
pragma solidity^ 0.8.2;
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Property is Ownable{
     using SafeMath for uint;
    address internal IERC20TokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
   
    struct PropertyDetail{
        address payable owner;
        string name;
        string description;
        string propertyUrl;
        uint price;
        
    }
    mapping(uint => PropertyDetail)public Properties;
    uint propertiesIndex =0;
   
    function writeProperty(string memory _name,string memory  _description,string memory _imageurl,uint _price)public {
     Properties[propertiesIndex]= PropertyDetail(payable(msg.sender),_name,_description,_imageurl,_price);
     propertiesIndex.add(1);
    }
    function readProperty(uint _index) public view returns(
        address,
        string memory,
         string memory,
          string memory,
          uint 
    ){

        return(Properties[_index].owner,Properties[_index].name,
        Properties[_index].description,
        Properties[_index].propertyUrl,
        Properties[_index].price
        );
    }

    function propertyLength()public view returns(uint){
        return propertiesIndex;
    }

    function _deleteProperty(uint _index)internal{
        delete  Properties[_index];
    }
    function deleteProperty(uint _index) public onlyOwner {
      _deleteProperty(_index);
    }

    function buyProperty(uint _index)external payable{
        require(IERC20Token(IERC20TokenAddress).transferFrom(msg.sender,Properties[_index].owner,Properties[_index].price),"Transefer Failed");
       
    }
}