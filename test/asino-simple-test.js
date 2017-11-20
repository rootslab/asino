/*
 * Asino simple test.
 */

exports.test  = function ( done, assertions ) {
	var log = console.log
		, assert = assertions || require( 'assert' )
		, exit = typeof done === 'function' ? done : function () {}
		, Asino = require( '../' )
		// options for current test
		, opt = {
			epop: 10
			, hfn: 2
			, ilen : 34
			// enable or disable dunce mode
			, dunce : !! false
		}
		, don = Asino( opt )
		, a = new Buffer( 'Asinus asino pulcherrimus' )
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

	log( ' - now test the coherence of results..' );
	for ( ; i--; ) {
		reply = don.key( data [ i ] );
		log( '\n ? key(%s): %s', data[ i ], reply );
		assert.ok( ! reply, 'key() doesn\'t return false!' );
		reply = don.try( data [ i] );
		log( ' + try(%s): %s', data[ i ], reply );
		assert.ok( ! reply, 'try() doesn\'t return false!' );
		reply = don.key( data [ i ] );
		log( ' ? key(%s): %s', data[ i ], reply );
		assert.ok( reply, 'key() doesn\'t return true!' );
	};

	log( '\n- rank(%d): %d (bits to 1)\n', don.bits, don.vector.items );

	// same results as calling rank on inner bitmap table (see "toni")
	assert.ok( don.vector.items === don.vector.rank( don.bits ), 'table total rank() and items should be the same!' );

	exit();
};

// single test execution with node
if ( process.argv[ 1 ] === __filename  ) exports.test = exports.test();