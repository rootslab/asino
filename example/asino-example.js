/*
 * Simple example with very small numbers
 */

var log = console.log
    , Asino = require( '../' )
    , don = Asino( {
        epop: 10
        , hfn: 2
        , ilen : 34
        // enable or disable dunce mode
        , dunce : !! false
    } )
    ;

var a = new Buffer( 'Asinus asino pulcherrimus' )
    , b = new Buffer( 'Bovem si nequeas, asinum agas' )
	, c = new Buffer( 'Beati monoculi in terra caecorum' )
	, d = new Buffer( 'Grege amisso, septa claudere' )
    , e = new Buffer( 'Asinus esuriens fustem negligit' )
	, f = new Buffer( 'Aut rex, aut asinus' )
    , g = new Buffer( 'Guttatim pelagi defluit omnis aqua' )
    , data = [ a, b, c, d, e, f, g ]
    , i = data.length
    , reply = false
    ;

log( '- init Asino bloom filter\n' );

log( '  - max expected population        : %d', don.epop );
log( '  - total elements in input        : %d\n', i );
log( '  - max bytes to parse from input  : %d', don.ilen );
log( '  - how many hash functions to use : %d', don.hfn );
log( '  - false positive probability     : %d', don.fpp );
log( '  - total space for bloom filter   : %d (bits)\n', don.bits );
log( '  - the dunce mode is active?      : %s', don.dunce );
log( '  - total space for random table   : %d (KB)\n', don.hash ? don.hash.table.length >>> 10 : 0 );


for ( ; i--; ) {
    reply = don.key( data [ i ] );
    log( '\n ? key(%s): %s', data[ i ], reply );
    reply = don.try( data [ i] );
    log( ' + try(%s): %s', data[ i ], reply );
    reply = don.key( data [ i ] );
    log( ' ? key(%s): %s', data[ i ], reply );
};

log( '\n- rank(%d): %d (bits to 1)\n', don.bits, don.vector.items );

// same results as calling rank on inner bitmap table (see "toni")

// log( '\n- rank(%d): %d (bits to 1)\n', don.bits, don.vector.rank( don.bits ) )

