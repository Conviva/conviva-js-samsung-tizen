/*! (C) 2020 Conviva, Inc. All rights reserved. Confidential and proprietary. */
!function(a,b){if("function"==typeof define&&define.amd?define(b):("object"==typeof exports||"object"==typeof module&&module.exports)&&(module.exports=b()),void 0!==a)if(void 0===a.Conviva){
if(void 0!==a.ConvivaModule)return;if(a.ConvivaModuleLoading)return;a.ConvivaModuleLoading=!0,a.ConvivaModule=b(),delete a.ConvivaModuleLoading}else{if(void 0!==a.Conviva.ProxyMonitor)return
;if(a.ConvivaModuleLoading)return;var c=b();a.ConvivaModuleLoading=!0,a.Conviva.ProxyMonitor=c.ProxyMonitor,a.Conviva.Impl.TizenProxy=c.Impl.TizenProxy,delete a.ConvivaModuleLoading}}(this,function(){
var a={};return function(){"use strict";!function(){a.ProxyMonitor={_proxyMonitor:null,release:function(){null!=this._proxyMonitor&&this._proxyMonitor.cleanup()},initConvivaDropIn:function(b,c,d,e){
var f="No player proxy initialized";if(void 0!==b&&null!==b)return this._proxyMonitor=new a.Impl.TizenProxy(b,c,d,e),this._proxyMonitor;throw new Error(f)}};a.Impl=a.Impl||{}
;var b=a.Impl.TizenProxy=function(a,c,d,e){function f(a,c,d,e){
if("undefined"==typeof webapis||void 0===webapis.avplay||null===webapis.avplay)throw new Error("TizenProxy: webapis.avplay cannot be null.");g._videoAnalytics=d,g._storedAppListener=a,
g._loggingInterface=c.buildLogger(),g._timerInterface=c.buildTimer(),g._loggingInterface.setModuleName("TizenProxy"),g._log("TizenProxy._constr()");var f={};f[e.Constants.MODULE_NAME]="Tizen AVPlay",
f[e.Constants.MODULE_VERSION]=b.version;try{f[e.Constants.APPLICATION_VERSION]=tizen.application.getAppInfo().version}catch(l){}g._videoAnalytics.setContentInfo(f);var h={}
;h[e.Constants.FRAMEWORK_NAME]="Tizen AVPlay";try{h[e.Constants.FRAMEWORK_VERSION]=webapis.avplay.getVersion()}catch(l){}g._videoAnalytics.setPlayerInfo(h);var i={};try{
i[e.Constants.DeviceMetadata.MODEL]=webapis.productinfo.getRealModel()}catch(l){}try{i[e.Constants.DeviceMetadata.VERSION]=webapis.productinfo.getFirmware()}catch(l){}
i[e.Constants.DeviceMetadata.TYPE]=e.Constants.DeviceType.SMARTTV,i[e.Constants.DeviceMetadata.CATEGORY]=e.Constants.DeviceCategory.SAMSUNG_TV,i[e.Constants.DeviceMetadata.OS_NAME]="Tizen";try{
i[e.Constants.DeviceMetadata.OS_VERSION]=tizen.systeminfo.getCapability("http://tizen.org/feature/platform.version")}catch(l){}
screen&&(screen.width&&void 0!==screen.width&&(i[e.Constants.DeviceMetadata.SCREEN_RESOLUTION_WIDTH]=screen.width),
screen.height&&void 0!==screen.height&&(i[e.Constants.DeviceMetadata.SCREEN_RESOLUTION_HEIGHT]=screen.height));try{var j=webapis.productinfo.getDuid(),k={};k.tizenDuid=j,
e.Analytics.setUniqueIdentifier(k,function(a){g._log("setUniqueIdentifier: callback msg="+a)})}catch(l){}e.Analytics.setDeviceMetadata(i),g._setAllEventListeners(),g._startPolling()}var g=this,h=500
;g._timerInterface=null,g._videoWidth=-1,g._videoHeight=-1,g._playerState=e.Constants.PlayerState.UNKNOWN,g._bitrate=0,g._duration=-1,g._isBuffering=!1,g._connectionType=null,g._encryptionType=null,
g._signalStrength=null,this.cleanup=function(){g._log("TizenProxy.cleanup()"),g._stopPolling(),g._removeAllEventListeners()},this._setAllEventListeners=function(){
g._log("TizenProxy._setAllEventListeners()");var a={onbufferingstart:function(){g._isBuffering=!0,
g._storedAppListener&&"function"==typeof g._storedAppListener.onbufferingstart&&g._storedAppListener.onbufferingstart()},onbufferingprogress:function(a){g._isBuffering=!0,
g._storedAppListener&&"function"==typeof g._storedAppListener.onbufferingprogress&&g._storedAppListener.onbufferingprogress(a)},onbufferingcomplete:function(){g._isBuffering=!1,
g._storedAppListener&&"function"==typeof g._storedAppListener.onbufferingcomplete&&g._storedAppListener.onbufferingcomplete()},oncurrentplaytime:function(a){
g._storedAppListener&&"function"==typeof g._storedAppListener.oncurrentplaytime&&g._storedAppListener.oncurrentplaytime(a)},onevent:function(a,b){g._onOtherEvent(a,b),
g._storedAppListener&&"function"==typeof g._storedAppListener.onevent&&g._storedAppListener.onevent(a,b)},onerror:function(a){g.onError(a),
g._storedAppListener&&"function"==typeof g._storedAppListener.onerror&&g._storedAppListener.onerror(a)},onsubtitlechange:function(a,b,c,d){
g._storedAppListener&&"function"==typeof g._storedAppListener.onsubtitlechange&&g._storedAppListener.onsubtitlechange(a,b,c,d)},ondrmevent:function(a,b){
g._storedAppListener&&"function"==typeof g._storedAppListener.ondrmevent&&g._storedAppListener.ondrmevent(a,b)},onstreamcompleted:function(){g.onPlaybackCompleted(),
g._storedAppListener&&"function"==typeof g._storedAppListener.onstreamcompleted&&g._storedAppListener.onstreamcompleted()}}
;!webapis.avplay||"NONE"!==webapis.avplay.getState()&&"IDLE"!==webapis.avplay.getState()&&"READY"!==webapis.avplay.getState()&&"PLAYING"!==webapis.avplay.getState()&&"PAUSED"!==webapis.avplay.getState()||(g._log("appListener overloaded"),
webapis.avplay.setListener(a)),"undefined"!=typeof document&&null!==document&&(g._log("visibilitychange event listener added"),document.addEventListener("visibilitychange",g._visibilityChanged))},
this._visibilityChanged=function(a){document.hidden?(g._log("The page is hidden."),e.Analytics.reportAppBackgrounded()):(g._log("The page is visible."),e.Analytics.reportAppForegrounded())},
this._removeAllEventListeners=function(){g._log("TizenProxy._removeAllEventListeners()"),
!webapis.avplay||"NONE"!==webapis.avplay.getState()&&"IDLE"!==webapis.avplay.getState()&&"READY"!==webapis.avplay.getState()&&"PLAYING"!==webapis.avplay.getState()&&"PAUSED"!==webapis.avplay.getState()||(g._log("appListener restored"),
webapis.avplay.setListener(g._storedAppListener)),"undefined"!=typeof document&&null!==document&&(g._log("visibilitychange event listener removed"),
document.removeEventListener("visibilitychange",g._visibilityChanged))},this._setDuration=function(){
if(webapis.avplay&&("NONE"===webapis.avplay.getState()||"IDLE"===webapis.avplay.getState()||"READY"===webapis.avplay.getState()||"PLAYING"===webapis.avplay.getState()||"PAUSED"===webapis.avplay.getState())){
var a=webapis.avplay.getDuration();if(!a)return;if(g._videoAnalytics&&g._duration!=a){g._log("TizenProxy._setDuration()");var b={};b[e.Constants.DURATION]=a/1e3,
"{}"!=JSON.stringify(b)&&g._videoAnalytics.setContentInfo(b),g._duration=a}}},this.onPlaybackCompleted=function(){g._log("TizenProxy.onPlaybackCompleted()"),
g._videoAnalytics&&g._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.PLAYER_STATE,e.Constants.PlayerState.STOPPED,"CONVIVA")},this.onError=function(a){g._log("TizenProxy.onError()")
;var b=a,c=e.Constants.ErrorSeverity.FATAL;switch(a){case"PLAYER_ERROR_INVALID_STATE":case"PLAYER_ERROR_NONE":case"PLAYER_ERROR_SEEK_FAILED":c=e.Constants.ErrorSeverity.WARNING}
g._videoAnalytics.reportPlaybackError(b,c)},this._onOtherEvent=function(a,b){g._log("TizenProxy._onOtherEvent() bitrate: "+a+";event data="+b),
"PLAYER_MSG_BITRATE_CHANGE"!==a&&"PLAYER_MSG_RESOLUTION_CHANGED"!==a||g._setBitrateResolution()},this._setBitrateResolution=function(){try{
if(g._videoAnalytics&&("PLAYING"==webapis.avplay.getState()||"PAUSED"==webapis.avplay.getState()||"READY"==webapis.avplay.getState())&&"function"==typeof webapis.avplay.getCurrentStreamInfo){
var a=0,b=0,c=0,d=0,f=webapis.avplay.getCurrentStreamInfo();for(var h in f){if(f[h]&&"VIDEO"===f[h].type){var i=JSON.parse(f[h].extra_info);i&&(a=Number(i.Bit_rate)||Number(i.bitrate),
c=i.Width||i.width,d=i.Height||i.height)}if(f[h]&&"AUDIO"===f[h].type){var j=JSON.parse(f[h].extra_info);j&&(b=Number(j.bit_rate)||Number(j.bitrate))}}var k=(a+b)/1e3
;k>0&&g._bitrate!=k&&(g._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.BITRATE,k,"CONVIVA"),g._bitrate=k),
(c>0&&g._videoWidth!=c||d>0&&g._videoHeight!=c)&&(g._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.RESOLUTION,c,d,"CONVIVA"),g._videoWidth=c,g._videoHeight=d)}}catch(l){}},
this._startPolling=function(){g._pollingTimerCancel=g._timerInterface.createTimer(g._poll,h,"TizenProxy._poll()")},this._poll=function(){
g._videoAnalytics.getAdType()!==e.Constants.AdType.CLIENT_SIDE?(g._setDuration(),g._setBitrateResolution(),g._updateNetworkInfo(),g._pollPosition(),
g._inferPlayerStateFromPosition()):g._playerState!=e.Constants.PlayerState.UNKNOWN&&(g._playerState=e.Constants.PlayerState.UNKNOWN)},this._pollPosition=function(){try{
"NONE"!==webapis.avplay.getState()&&"IDLE"!==webapis.avplay.getState()&&"READY"!==webapis.avplay.getState()&&"PLAYING"!==webapis.avplay.getState()&&"PAUSED"!==webapis.avplay.getState()||(g._previousPosition=g._currentPosition,
g._currentPosition=webapis.avplay.getCurrentTime(),g._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.PLAY_HEAD_TIME,g._currentPosition,"CONVIVA"))}catch(a){}},
this._inferPlayerStateFromPosition=function(){
if("NONE"!==webapis.avplay.getState()&&"IDLE"!==webapis.avplay.getState()&&"READY"!==webapis.avplay.getState()&&"PLAYING"!==webapis.avplay.getState()&&"PAUSED"!==webapis.avplay.getState())return void g._log("Invalid Tizen state")
;"PAUSED"===webapis.avplay.getState()?g._setPlayerState(e.Constants.PlayerState.PAUSED):"NONE"===webapis.avplay.getState()||"IDLE"===webapis.avplay.getState()?g._setPlayerState(e.Constants.PlayerState.BUFFERING):"PLAYING"!==webapis.avplay.getState()&&!0!==g._isBuffering||(0!==g._currentPosition&&g._currentPosition!==g._previousPosition?Math.abs(g._currentPosition-g._previousPosition)<1.1*h&&g._setPlayerState(e.Constants.PlayerState.PLAYING):0===g._currentPosition&&g._currentPosition!==g._previousPosition||g._setPlayerState(e.Constants.PlayerState.BUFFERING))
},this._stopPolling=function(){null!=g._pollingTimerCancel&&g._pollingTimerCancel()},this._log=function(a){g._loggingInterface.log(a,e.SystemSettings.LogLevel.DEBUG)},this._setPlayerState=function(a){
g._playerState!==a&&(g._log("TizenProxy.InferCurrentState(): "+a),g._videoAnalytics.reportPlaybackMetric(e.Constants.Playback.PLAYER_STATE,a,"CONVIVA"),g._playerState=a)},
this._updateNetworkInfo=function(){try{var a=webapis.network.getActiveConnectionType();if(a=a.toString(),g._connectionType!==a&&(g._connectionType=a,
e.Analytics.reportDeviceMetric(e.Constants.Network.CONNECTION_TYPE,a),"1"===a)){var b=webapis.network.getWiFiEncryptionType();b=b.toString(),g._encryptionType!==b&&(g._encryptionType=b,
e.Analytics.reportDeviceMetric(e.Constants.Network.LINK_ENCRYPTION,a));var c=webapis.network.getWiFiSignalStrengthLevel();c=c.toString(),g._signalStrength!==c&&(g._signalStrength=c,
e.Analytics.reportDeviceMetric(e.Constants.Network.SIGNAL_STRENGTH,c))}}catch(d){}},f.apply(this,arguments)};b.version="4.0.2"}()}(),a});