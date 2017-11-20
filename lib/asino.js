/*
 * Asino a stubborn, simple and fast Bloom filter for the rest of us.
 * Copyright(c) 2017-present Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.Asino = ( function () {

	var util = require( 'util' )
		, Bolgia = require( 'bolgia' )
		, Hazz = require( 'hazz' )
		, Mazz = require( 'mazz' )
		, Toni = require( 'toni' )
		, improve = Bolgia.improve
		, clone = Bolgia.clone
		, floor = Math.floor
		, mlog = Math.log
		, pow = Math.pow
		, iln2 = 1 / mlog( 2 )
		// default options
		, asino_opt = {
			epop: 10000
			, ilen : 32
			, hfn : 6
			, dunce: false
		}
		, init = function ( me ) {
			// how many functions?
			me.hfn = me.hfn >>> 0 ? me.hfn : 6;
			me.fpp = - 1 / pow( 10, me.hfn );
			// bits/range for vector
			me.bits = floor( me.epop * me.hfn * iln2 );
		}
		, Asino = function ( opt ) {
			var me = this
				, is = me instanceof Asino
				;
			if ( ! is ) return new Asino( opt );
			improve( me, improve( opt, asino_opt ) );
			// calc bits
			init( me );
			// init vector/bitmap
			me.vector = Toni( me.bits );
			// if dunce mode is off, init the pseudo-random hash table
			if ( ! me.dunce ) me.hash = Hazz( me.ilen, me.hfn );
		}
		, aproto = Asino.prototype
		;
	
	aproto.key = function ( data ) {
		var me = this
			, vector = me.vector
			, bits = me.bits
			, h = me.dunce ? 
				Mazz.all( data, bits ) :
				me.hash.all( data, bits )
			, cnt = me.hfn
			, i = cnt
			;
		for ( ; i--; ) vector.chk( h[ i ] ) && --cnt;

		return ! cnt;
	};

	aproto.try = function ( data ) {
		var me = this
			, vector = me.vector
			, bits = me.bits
			, h = me.dunce ? 
				Mazz.all( data, bits ) :
				me.hash.all( data, bits )
			, cnt = me.hfn
			, i = cnt
			;
		for ( ; i--; ) ! ~ vector.add( h[ i ] ) && --cnt;

		return ! cnt;
	};

	aproto.yoke = function () {
		var me = this
			;
		if ( ! me.dunce ) me.hash.refill();
        me.vector.clear();
		return me;
	};

	aproto.grow = function ( opt ) {
		var me = this
			;
			if ( opt ) {
				if ( opt.hfn ) me.hfn = opt.hfn;
				if ( opt.ilen ) me.ilen = opt.ilen;
				if ( opt.epop ) me.epop = opt.epop;
				if ( opt.dunce ) me.dunce = opt.dunce;
			}
			init( me );
			if ( ! me.dunce ) me.hash = Hazz( me.ilen, me.hfn );
	        me.vector = Toni( me.bits );
	    return me;
	};

	return Asino;

} )();
