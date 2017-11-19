/*
 * Asino full test on a set of disinct words.
 */

exports.test  = function ( done, assertions ) {
    var log = console.log
        , assert = assertions || require( 'assert' )
        , exit = typeof done === 'function' ? done : function () {}
		, fs = require( 'fs' )
		, max = Math.max
		, Bop = require( 'bop' )
        , Asino = require( '../' )
        // default options
        , opt = {
			epop: 5000
			, ilen : 32
			, hfn : 2
			, dunce: false
		}
        , filepath = __dirname + '/2243-long-english-words.txt'
        , data = fs.readFileSync( filepath )
		// delimiter
		, pattern = '\n'
        , bop = Bop( pattern )
        , offsets = bop.parse( data )
        , words = []
        , c = 0
        , p = 0
        , max_length = 0
        , collisions = 0
        , refresh_attempts = 0
        , grow_attempts = 0
        ;

    log( '\n- data file path:', filepath );

    log( '\n- %d distinct english words loaded.', offsets.length );

    // split strings and get max input length
    // split strings and get max input length
    for ( ; c < offsets.length; p = 1 + offsets[ c++ ]  )
    	words.push( data.slice( p, offsets[ c ] ) ) && 
    	( max_length = max( max_length, offsets[ c ] - p ) )
    ;

    log( '- max length found is %d bytes.', max_length );

    // change option for input length
    opt.ilen = max_length;

    log( '\n- init bloom filter with:', opt );

    // create bloom filter
    don = Asino( opt );
	
	log( '\n- try to use %d hash functions', opt.hfn );

    while ( grow_attempts < 10 ) {
	    while ( refresh_attempts < 10 ) {
		    collisions = 0;
		    // try to add words
		    c = words.length;
		    for ( ; c--; ) {
		    	if ( don.try( words [ c ] ) ) {
		    		// hash collision detected
		    		++collisions;
		    		// log( '! (%d) suspect: %s', collisions, words[ c ] );
		    	} 
		    }
		    if ( ! collisions ) break;
		    // try to refresh pseudo randonm data
		    don.yoke();
		    assert.ok( don.vector.items === 0, 'bloom filter should be empty!' ); 
		    assert.ok( don.vector.rank( don.bits ) === 0, 'bloom filter should be empty!' ); 
		    log( '- attempt %d, suspects: %d', 1 + refresh_attempts, collisions );
		    ++refresh_attempts;
		}
		if ( ! collisions ) break;
		refresh_attempts = 0;
		// grow only the number of functions
		don.grow( { hfn : ++opt.hfn } );
		assert.ok( don.hfn === opt.hfn, 'wrong number of functions!! should be: ' + opt.hfn + ' is: ' + don.hfn );
		log( '\n- try to use %d hash functions', opt.hfn );
		++grow_attempts;
	};
	if ( ! collisions ) log( '\n -> ok, no collisions (false postiives)!' );
	assert.ok( ! collisions, 'no collisions should be found at this point!' );

    exit();
};

// single test execution with node
if ( process.argv[ 1 ] === __filename  ) exports.test = exports.test();