/*
 * Asino init test.
 */

exports.test  = function ( done, assertions ) {
    var log = console.log
        , floor = Math.floor
        , mlog = Math.log
        , min = Math.min
        , iln2 = 1 / mlog( 2 )
        , assert = assertions || require( 'assert' )
        , exit = typeof done === 'function' ? done : function () {}
        , Asino = require( '../' )
        // options for current test
        , opt = {
            epop: 100
            // set a number > 16 (not correct for dunce mode) 
            , hfn: 20
            , ilen : 34
            // enable dunce mode
            , dunce : !! true
        }
        , don = Asino( opt )
        , expected_BF_size = floor( opt.epop * min( opt.hfn, 16 ) * iln2 )
        ;

    log( '- init Asino Bloom filter in dunce mode with hfn > 16 (wrong)\n' );

    log( '  - hash functions should be 16 at max, now:', don.hfn );
    assert.ok( 16 === don.hfn );

    log( '  - total space for bloom filter should be: %d (bits), now is:', expected_BF_size, don.bits  );
    assert.ok( expected_BF_size === don.bits );
    
    // exit test
    exit();
};

// single test execution with node
if ( process.argv[ 1 ] === __filename  ) exports.test = exports.test();