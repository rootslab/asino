/*
 * Asino
 * Copyright(c) 2017-present Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.Asino = ( function () {

    var log = console.log
        , emitter = require( 'events' ).EventEmitter
        , util = require( 'util' )
        , Bolgia = require( 'bolgia' )
        , Hazz = require( 'hazz' )
        , Toni = require( 'toni' )
        , improve = Bolgia.improve
        , clone = Bolgia.clone
        , max = Math.max
        , asino_opt = {
            range : 1 << 16
            , ilen : 16
            , hfn : 10
        }
        , Asino = function ( opt ) {
            var me = this
                , is = me instanceof Asino
                ;
            if ( ! is ) return new Asino( opt );
            me.options = opt = improve( clone( opt ), asino_opt );
        }
        , aproto = null
        ;

    util.inherits( Asino, emitter );
    
    aproto = Asino.prototype;
    
    aproto.do = function () {
        var me = this
            ;
        return me;
    };

    return Asino;

} )();

exports.Asino.version = require( '../package' ).version;
