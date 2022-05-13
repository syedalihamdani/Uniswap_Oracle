pragma solidity ^0.7.6;

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "@uniswap/v3-periphery/contracts/libraries/OracleLibrary.sol";

contract UniswapV3Oracle{
    address public token0;
    address public token1;
    address public pool;
    address public factory;
    uint24 public fee;
    constructor(address _factory,address _token0,address _token1, uint24 _fee){
        token0=_token0;
        token1=_token1;

        address _pool=IUniswapV3Factory(_factory).getPool(
            _token0,_token1,_fee
        );
        require(_pool!=address(0),"pool doesn't exist");
        pool=_pool;
        factory=_factory;
        fee=_fee;
    }

    function estimateAmountOut(
        address tokenIn,
        uint128 amountIn,
        uint32 secondsAgo
    ) external view returns (uint amountOut){
        require(tokenIn==token0||tokenIn==token1,"invalid token");
        address tokenOut=tokenIn==token0 ? token1:token0;
        (int24 tick, )=OracleLibrary.consult(pool,secondsAgo);
        amountOut=OracleLibrary.getQuoteAtTick(
            tick,amountIn,tokenIn,tokenOut
        );
//  This function is completed, To make the more consise and optimise then we can copy some of the from the consult
    }

     function setPoolTokens(address _token0,address _token1) external {
        token0=_token0;
        token1=_token1;

        address _pool=IUniswapV3Factory(factory).getPool(
            _token0,_token1,fee
        );
        require(_pool!=address(0),"pool doesn't exist");
        pool=_pool;
    }
}
