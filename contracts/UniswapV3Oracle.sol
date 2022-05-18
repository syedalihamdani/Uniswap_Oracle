pragma solidity ^0.7.6;

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "@uniswap/v3-periphery/contracts/libraries/OracleLibrary.sol";

contract UniswapV3Oracle{
    // address public token0;
    // address public token1;
    // address public pool;
    address public factory;
    // uint24 public fee;
    constructor(address _factory){
        factory=_factory;
    }

     function getAmount(
     address _token0,
     address _token1, 
     uint24 _fee,
     address tokenIn,
     uint128 amountIn,
    uint32 secondsAgo
    ) external view returns(uint amountOut)
    {
        address _pool=IUniswapV3Factory(factory).getPool(
            _token0,_token1,_fee
        );
        require(_pool!=address(0),"pool doesn't exist");
        _pool;
require(tokenIn==_token0||tokenIn==_token1,"invalid token");
        address tokenOut=tokenIn==_token0 ? _token1:_token0;
        (int24 tick, )=OracleLibrary.consult(_pool,secondsAgo);
        amountOut=OracleLibrary.getQuoteAtTick(
            tick,amountIn,tokenIn,tokenOut
        );
    }

}
