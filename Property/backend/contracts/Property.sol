// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20Token {
    function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract Property is Ownable {
    address internal IERC20TokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct PropertyDetail {
        address payable owner;
        string name;
        string description;
        string propertyUrl;
        uint256 price;
        bool sale;
    }
    mapping(uint256 => PropertyDetail) private Properties;
    mapping(uint256 => bool) private _exists;

    uint256 propertiesIndex = 0;

    // modifier to check if property with index as id exists
    modifier exists(uint256 _index) {
        require(_exists[_index], "Query of nonexistent property");
        _;
    }

    /**
     * @dev allow users to create a property on the platform
     * @notice input data needs to contain only valid values
     */
    function writeProperty(
        string calldata _name,
        string calldata _description,
        string calldata _imageUrl,
        uint256 _price
    ) public {
        require(bytes(_name).length > 0, "Empty name");
        require(bytes(_description).length > 0, "Empty description");
        require(bytes(_imageUrl).length > 0, "Empty image url");
        Properties[propertiesIndex] = PropertyDetail(
            payable(msg.sender),
            _name,
            _description,
            _imageUrl,
            _price,
            true // sale initialized as true
        );
        _exists[propertiesIndex] = true;
        propertiesIndex++;
    }

    function readProperty(uint256 _index)
        public
        view
        exists(_index)
        returns (
            address,
            string memory,
            string memory,
            string memory,
            uint256,
            bool
        )
    {
        return (
            Properties[_index].owner,
            Properties[_index].name,
            Properties[_index].description,
            Properties[_index].propertyUrl,
            Properties[_index].price,
            Properties[_index].sale
        );
    }

    function propertyLength() public view returns (uint256) {
        return propertiesIndex;
    }

    /**
     * @dev allows the current contract's owner to delete a property from the platform
     */
    function deleteProperty(uint256 _index) public onlyOwner exists(_index) {
        uint256 newPropertiesIndex = propertiesIndex - 1;
        propertiesIndex = newPropertiesIndex;
        _exists[newPropertiesIndex] = false;
        Properties[_index] = Properties[newPropertiesIndex];
        delete Properties[newPropertiesIndex];
    }

    /**
     * @dev allow users to buy a propert that is up for sale on the platform
     */
    function buyProperty(uint256 _index) external payable exists(_index) {
        PropertyDetail storage currentProperty = Properties[_index];
        require(
            currentProperty.owner != msg.sender,
            "You can't buy a property you already own"
        );
        require(currentProperty.sale, "Property isn't up for sale");

        address payable propertyOwner = currentProperty.owner;

        currentProperty.owner = payable(msg.sender);
        currentProperty.sale = false;
        require(
            IERC20Token(IERC20TokenAddress).transferFrom(
                msg.sender,
                propertyOwner,
                currentProperty.price
            ),
            "Transefer Failed"
        );
    }

    /**
     * @dev allows properties' owners to toggle the sale status of their property
     */
    function toggleSale(uint256 _index) public {
        require(Properties[_index].owner == msg.sender, "Unauthorized caller");
        Properties[_index].sale = !Properties[_index].sale;
    }
}
