webpackJsonp([0],{126:function(e,n,i){"use strict";var l=i(0);e.exports=function(e){function n(e,n){return o.document("vehicle-"+e+"-info").then(function(i){return console.log("initVehicleExtraInfo",e,n),i.set(n)})}function t(e){return o.document("vehicle-"+e+"-info").then(function(n){return console.log("fetchVehicleExtraInfo",e,n.value),n.value})}function a(n){o.list("vehicle-"+n+"-data").then(function(i){i.getItems({limit:100,order:"desc"}).then(function(i){console.info("items arrived",n,i.items.length),r[n].driving_data=i.items.reverse().map(function(i){return i.data.value.id=i.index,e.onVehicleData(r[n],i.data.value),i.data.value})}),i.on("itemAdded",function(i){console.info("itemAdded",n,i),i.data.value.id=i.index,r[n].driving_data.push(i.data.value),e.onVehicleData(r[n],i.data.value)})})}var o,c,s=i(1),d=i(171).Client,r={};return{vehicles:r,updateToken:function(n){var i=this;return s.get("/authenticate?"+c,function(l){l.success?(console.log("token updated:",l),n?n(l.sync_token,l.twiml_app_token):(o.updateToken(l.sync_token),Twilio.Device.setup(l.twiml_app_token)),setTimeout(i.updateToken.bind(i),1e3*l.ttl*.96)):(console.error("failed to authenticate the user: ",l.error),c="",e.authFailed(l.error))}).fail(function(n,i,l){console.error("failed to send authentication request:",i,l),c="",e.authFailed(l)})},refreshVehicleList:function(){s.get("/fleetmanager?"+c+"&op=list",function(n){n.success?s.when.apply(s,s.map(n.vehicles,function(e){var n=e.uniqueName;return r[n]={info:{id:n,name:e.friendlyName,created_at:l(e.date_created).format("MMM DD YYYY @ hh:mm")},driving_data:[]},t(n).then(function(i){r[n].info=s.extend(r[n].info,i),a(e.uniqueName)})})).done(function(){e.refresh()}):console.error("failed to list vehicles:",n)}).fail(function(e,n,i){console.error("failed to send list vehicles request:",n,i.toString())})},addVehicle:function(e,i){if(!e.id)return i({success:!1,error:"Vehicle id should not be empty"});s.get("/fleetmanager?"+c+"&op=add&vehicle_id="+e.id.toUpperCase()+"&vehicle_name="+(e.name||""),function(t){if(t.success){var o={type:e.type,mobile:e.mobile},c={info:s.extend({id:t.vehicle.uniqueName,name:t.vehicle.friendlyName,created_at:l(t.vehicle.date_created).format("MMM DD YYYY @ hh:mm"),key:t.key.sid,secret:t.key.secret},o),driving_data:[]};r[t.vehicle.uniqueName]=c,n(t.vehicle.uniqueName,o).then(function(){a(t.vehicle.uniqueName),i(null,c)})}else i(t)}).fail(function(e,n,l){i({success:!1,error:l}),console.error("failed to send add vehicle request:",n,l.toString())})},deleteVehicle:function(n){s.get("/fleetmanager?"+c+"&op=delete&vehicle_id="+n,function(i){i.success?(delete r[n],e.refresh()):console.error("failed to delete vehicle",i)}).fail(function(e,n,i){console.error("failed to send delete vehicle request:",n,i.toString())})},generateKey:function(n){s.get("/fleetmanager?"+c+"&op=genkey&vehicle_id="+n,function(i){i.success?(r[n].info.key=i.key.sid,r[n].info.secret=i.key.secret,e.refresh()):console.error("failed to generate key",i)}).fail(function(e,n,i){console.error("failed to send generate key request:",n,i.toString())})},call:function(e,n){var i=Twilio.Device.activeConnection();console.log("call",e),e.voiceConnection?(console.log("call.disconnect"),e.voiceConnection.disconnect(),e.voiceConnection=null,s(".btn-call").prop("disabled",!1)):(s(".btn-call").prop("disabled",!0),s(n).prop("disabled",!1),i?console.log("call.incall"):(console.log("call.connect"),s(n).addClass("btn-danger"),s(n).html("End Call"),Twilio.Device.disconnect(function(){console.log("call.disconnected"),s(".btn-call").prop("disabled",!1),s(n).removeClass("btn-danger"),s(n).html("Call")}),e.voiceConnection=Twilio.Device.connect({number:e.info.mobile})))},checkLoggedIn:function(){c||e.authRequired()},login:function(n,i){var l=this;c="username="+n+"&pincode="+i,this.updateToken(function(n,i){o=new d(n),Twilio.Device.setup(i),l.refreshVehicleList(),e.onAuthenticated()})},init:function(){this.checkLoggedIn()}}}},127:function(e,n,i){i(163);var l,t,a=i(6),o={init:function(e,n){l={},t={};for(var i in e.vehicles){var a=e.vehicles[i];a.driving_data.forEach(function(e){o.onVehicleData(a,e),o.onVehicleStats(a,n[a.info.id])})}},onVehicleData:function(e,n){if(!t[e.info.id]){var i="map-"+e.info.id,o=a.initMapElement(i);l[e.info.id]=o,t[e.info.id]={}}var c=l[e.info.id],s=t[e.info.id];a.addDataToMap(c,s,n)},onVehicleStats:function(e,n){if(n){var i="vehicle"+e.info.id;a.updateStats(i,n)}}};e.exports=o},128:function(e,n,i){i(164);var l={init:function(app,e){$("#input-form-submit").click(function(){app.login(e.username,e.password)})}};e.exports=l},129:function(e,n,i){i(166);var l=i(1),t={init:function(){l(".add-vehicle-show").click(function(){l(this).hide(),l(".add-vehicle").fadeIn(333),l("#id").val(""),l("#name").val(""),l("#sim_sid").val("")}),l(".add-vehicle-cancel").click(function(){l(".add-vehicle").hide(),l(".add-vehicle-show").fadeIn(333)})},onVehicleAddingFailed:function(e){l("#add-vehicle-failed").text(JSON.stringify(e))},onVehicleAdded:function(){l(".add-vehicle").hide(),l(".add-vehicle-show").fadeIn(333)}};e.exports=t},131:function(e,n,i){e.exports=i.p+"index.html"},132:function(e,n){e.exports=angular},133:function(e,n){e.exports=void 0},134:function(e,n,i){"use strict";function l(e){e.info.id in p||(p[e.info.id]=0,u[e.info.id]=0,f[e.info.id]=0)}function t(e,n){l(e);var i=++p[e.info.id],t=u[e.info.id],a=f[e.info.id],o={miles:n.miles.toFixed(0),avg_speed:(t/i).toFixed(0),driver_score:(a/i).toFixed(0),fuel:n.fuel.toFixed(0),brake:n.brake.toFixed(0),runtime:n.runtime};u[e.info.id]=u[e.info.id]+n.speed,f[e.info.id]=f[e.info.id]+n.avgT,m[e.info.id]=o}var a=i(132);i(133),i(3),i(4),i(131);var o,c,s=i(128),d=i(127),r=i(6),v=i(129),h={},p={},u={},f={},m={},App=i(126);window.app=new App({refresh:function(){c.$apply()},onVehicleData:function(e,n){o.onVehicleData&&o.onVehicleData(e,n),"CAR"===e.info.type&&(t(e,n),o.onVehicleStats&&o.onVehicleStats(e,m[e.info.id]))},onAuthenticated:function(){window.location.href="/#!/dashboard",c.$apply()},authFailed:function(e){h.reason=e,window.location.href="/#!/login",c.$apply()},authRequired:function(){h.reason="",window.location.href="/#!/login"}}),a.module("app",["ngRoute"]).controller("LoginViewCtrl",["$scope","$timeout",function(e,n){c=e,e.auth=h,o=s,n(function(){s.init(app,e.auth)})}]).controller("DashboardViewCtrl",["$scope","$timeout",function(e,n){app.checkLoggedIn(),c=e,e.app=app,e.vehicles=app.vehicles,o=d,n(function(){d.init(e,m)},0)}]).controller("VehicleViewCtrl",["$routeParams","$scope","$timeout",function(e,n,i){app.checkLoggedIn(),c=n,n.app=app,n.vehicles=app.vehicles,n.id=e.id,n.vehicle=app.vehicles[e.id],o=r,n.vehicle&&i(function(){r.init(n),r.onVehicleStats(n.vehicle,m[n.vehicle.info.id])},0)}]).controller("VehicleListViewCtrl",["$scope","$timeout",function(e,n){app.checkLoggedIn(),c=e,e.vehicles=app.vehicles,e.newVehicle={},e.addVehicle=function(){app.addVehicle(a.copy(e.newVehicle),function(n,i){n?v.onVehicleAddingFailed(n):(e.vehicleAdded=i,v.onVehicleAdded(),e.$apply())})},e.deleteVehicle=function(e){app.deleteVehicle(e)},e.generateVehicleKey=function(e){app.generateKey(e)},o=v,v.init()}]).config(["$routeProvider",function(e){e.when("/dashboard",{controller:"DashboardViewCtrl",templateUrl:"views/dashboard.html"}).when("/vehicles/:id",{controller:"VehicleViewCtrl",templateUrl:"views/vehicle.html"}).when("/vehicles",{controller:"VehicleListViewCtrl",templateUrl:"views/vehicle_list.html"}).when("/login",{controller:"LoginViewCtrl",templateUrl:"views/login.html"}).otherwise({redirectTo:"/dashboard"})}])},163:function(e,n){var i="views/dashboard.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(i,'<h1>Active Vehicles</h1>\n\n<h3 ng-hide="vehicles.length" class="ng-hide">There are currently no vehicles on the road.</h3>\n\n<div ng-repeat="vehicle in vehicles" class="jumbotron vehicle vehicle{{vehicle.info.id}}">\n  <h3>({{ vehicle.info.type }}) {{ vehicle.info.id }} | {{vehicle.info.name}} <a href="#!/vehicles/{{vehicle.info.id}}">(view past drives)</a></h3>\n  <h4>Current trip time: <span class="runtime">0</span></h4>\n  <div class="row map-cont">\n    <div class="col-lg-12">\n      <div class="map" id="map-{{vehicle.info.id}}"></div>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-lg-4 col-lg-offset-4">\n      <button class="btn btn-primary btn-call" ng-click="app.call(vehicle, $event.currentTarget)">Call</button>\n    </div>\n  </div>\n  <div class="row" ng-if="vehicle.info.type == \'CAR\'">\n    <div class="col-lg-2 col-lg-offset-1">\n      <div class="panel panel-info">\n        <div class="panel-heading">\n          <h3 class="panel-title">Trip Distance</h3>\n        </div>\n        <div class="panel-body miles">\n          <span>00</span> miles\n        </div>\n      </div>\n    </div>\n    <div class="col-lg-2">\n      <div class="panel panel-success">\n        <div class="panel-heading">\n          <h3 class="panel-title">Average Speed</h3>\n        </div>\n        <div class="panel-body speed">\n          <span>00</span> mph\n        </div>\n      </div>\n    </div>\n    <div class="col-lg-2">\n      <div class="panel panel-danger">\n        <div class="panel-heading">\n          <h3 class="panel-title">Hard Brakes</h3>\n        </div>\n        <div class="panel-body brake">\n          <span>00</span>\n        </div>\n      </div>\n    </div>\n    <div class="col-lg-2">\n      <div class="panel panel-danger">\n        <div class="panel-heading">\n          <h3 class="panel-title">Fuel Guage</h3>\n        </div>\n        <div class="panel-body fuel">\n          <span>00</span>%\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n')}]),e.exports=i},164:function(e,n){var i="views/login.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(i,'<div class="login-form container">\n    <p id="login-reason" class="text-warning">{{ auth.reason }}</p>\n    <label><b>Username</b></label>\n    <input type="text" id="input-form-username" placeholder="Enter Username" ng-model="auth.username">\n\n    <label><b>Password</b></label>\n    <input type="password" id="input-form-password" placeholder="Enter Password" ng-model="auth.password">\n\n    <button id="input-form-submit" type="submit">Login</button>\n</div>\n')}]),e.exports=i},165:function(e,n){var i="views/vehicle.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(i,'<div class="jumbotron vehicle ">\n  <h3>({{ vehicle.info.type }}) {{ vehicle.info.name }}</h3>\n  <h4>Total trip time: <span class="runtime">0</span></h4>\n  <div class="row map-cont">\n    <div class="col-lg-12">\n      <div class="map" id="map"></div>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-lg-4 col-lg-offset-4">\n      <button class="btn btn-primary btn-call" ng-click="app.call(vehicle, $event.currentTarget)">Call</button>\n    </div>\n  </div>\n  <div class="row" ng-if="vehicle.info.type == \'CAR\'">\n    <div class="col-lg-2 col-lg-offset-1">\n      <div class="panel panel-info">\n        <div class="panel-heading">\n          <h3 class="panel-title">Trip Distance</h3>\n        </div>\n        <div class="panel-body miles">\n          <span>00</span> miles\n        </div>\n      </div>\n    </div>\n    <div class="col-lg-2">\n      <div class="panel panel-success">\n        <div class="panel-heading">\n          <h3 class="panel-title">Average Speed</h3>\n        </div>\n        <div class="panel-body speed">\n          <span>00</span> mph\n        </div>\n      </div>\n    </div>\n    <div class="col-lg-2">\n      <div class="panel panel-danger">\n        <div class="panel-heading">\n          <h3 class="panel-title">Hard Brakes</h3>\n        </div>\n        <div class="panel-body brake">\n          <span>00</span>\n        </div>\n      </div>\n    </div>\n    <div class="col-lg-2">\n      <div class="panel panel-danger">\n        <div class="panel-heading">\n          <h3 class="panel-title">Fuel Guage</h3>\n        </div>\n        <div class="panel-body fuel">\n          <span>00</span>%\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n')}]),e.exports=i},166:function(e,n){var i="views/vehicle_list.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(i,'<div class="row">\n  <div class="col-lg-12">\n    <div class="page-header">\n      <h1 id="tables">Vehicles</h1>\n    </div>\n    <div class="bs-component">\n      <table class="table table-striped table-hover ">\n        <thead>\n          <tr>\n            <th>Id</th>\n            <th>Name</th>\n            <th>Mobile</th>\n\x3c!--\n            <th>Twilio SIM SID</th>\n--\x3e\n            <th>Key</th>\n            <th>Created</th>\n            <th>Operations</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr ng-repeat="vehicle in vehicles" class="jumbotron vehicle vehicle{{vehicle.info.id}}" ng-class="{\'text-success\': vehicleAdded.info.id === vehicle.info.id}">\n            <td>{{ vehicle.info.id }}</td>\n            <td>{{ vehicle.info.name }}</td>\n            <td>{{ vehicle.info.mobile }}</td>\n\x3c!--\n            <td>{{ vehicle.info.sim_sid }}</td>\n            <td>{{ vehicle.info.key }} <small ng-if="vehicle.info.secret" class="text-warning"><br/>Secret: {{ vehicle.info.secret }}</small></td>\n--\x3e\n            <td>\n              <div ng-if="vehicle.info.key">{{ vehicle.info.key }} <small class="text-warning"><br/>Secret: {{ vehicle.info.secret }}</small></div>\n              <div ng-if="!vehicle.info.key" class="text-danger">Hidden</div>\n            </td>\n            <td>{{ vehicle.info.created_at }}</td>\n\x3c!--\n            <td><a href="#!/vehicles/{{ vehicle.info.id }}/edit" class="btn btn-xs btn-success">Edit</a></td>\n--\x3e\n            <td>\n              <button ng-click="generateVehicleKey(vehicle.info.id)" class="btn btn-xs btn-danger">Generate New Key</button>\n              <button ng-click="deleteVehicle(vehicle.info.id)" class="btn btn-xs btn-danger">Delete</button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    <div id="source-button" class="btn btn-primary btn-xs" style="display: none;">&lt; &gt;</div></div>\n  </div>\n  <div class="divider col-lg-10 bg-primary"></div>\n</div>\n\n<a class="btn btn-primary add-vehicle-show">Add New Vehicle</a>\n\n<div class="row add-vehicle">\n  <div class="col-lg-6">\n    <form class="form-horizontal" ng-submit="addVehicle()">\n      <fieldset>\n        <legend>New Vehicle</legend>\n\n        <div class="form-group">\n          <label for="type" class="col-lg-2 control-label">Type</label>\n          <div class="col-lg-10">\n            <select type="text" class="form-control" ng-model="newVehicle.type" ng-init="newVehicle.type=\'BIKE\'" id="type" autocomplete="off">\n                <option value="CAR">Car</option>\n                <option value="BIKE">Bicycle</option>\n            </select>\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label for="id" class="col-lg-2 control-label">Id</label>\n          <div class="col-lg-10">\n            <input type="text" class="form-control" ng-model="newVehicle.id" id="id" placeholder="Id" autocomplete="off">\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label for="name" class="col-lg-2 control-label">Name</label>\n          <div class="col-lg-10">\n            <input type="text" class="form-control" ng-model="newVehicle.name" id="name" placeholder="Name" autocomplete="off">\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label for="mobile" class="col-lg-2 control-label">Mobile</label>\n          <div class="col-lg-10">\n            <input type="text" class="form-control" ng-model="newVehicle.mobile" id="mobile" placeholder="Mobile Number" autocomplete="off">\n          </div>\n        </div>\n\n\x3c!--\n        <div class="form-group">\n          <label for="sim_sid" class="col-lg-2 control-label">Twilio SIM SID</label>\n          <div class="col-lg-10">\n            <input type="text" class="form-control" ng-model="newVehicle.sim_sid" id="sim_sid" placeholder="Twilio SIM SID">\n          </div>\n        </div>\n--\x3e\n\n        <div class="form-group">\n          <div class="col-lg-10 col-lg-offset-2">\n            <button type="submit" class="btn btn-primary">Submit</button>\n            <button type="reset" class="btn btn-default add-vehicle-cancel">Cancel</button>\n          </div>\n        </div>\n\n        <p class="text-warning" id="add-vehicle-failed"></p>\n      </fieldset>\n    </form>\n  </div>\n</div>\n')}]),e.exports=i},171:function(e,n){e.exports=Twilio.Sync},6:function(e,n,i){i(165);var l,t,a=i(1),o={},c={init:function(e){t=e.id,l=c.initMapElement("map"),e.vehicle.driving_data.forEach(function(n){c.onVehicleData(e.vehicle,n)})},onVehicleData:function(e,n){console.log("vehicle.info",e.info),e.info.id==t&&c.addDataToMap(l,o,n)},onVehicleStats:function(e,n){c.updateStats("vehicle",n)},initMapElement:function(e){return new google.maps.Map(document.getElementById(e),{zoom:14})},addDataToMap:function(e,n,i){var l={lat:i.lat,lng:i.lon},t=new google.maps.Marker({position:l,map:e,title:String(i.id)}),a='<div class="infowindow-label">                             <h1>Point data</h1>'+(i.miles?'<p><span class="label label-default">Distance:</span> <span class="value">'+i.miles.toFixed(0)+" Miles</span></p>":"")+(i.speed?'<p><span class="label label-default">Speed:</span> <span class="value">'+i.speed.toFixed(0)+" mph</span></p>":"")+(i.fuel?'<p><span class="label label-default">Fuel:</span> <span class="value">'+i.fuel.toFixed(0)+"%</span></p>":"")+"</div>",o=new google.maps.InfoWindow({content:a});n[i.id]=o,e.panTo(t.getPosition()),google.maps.event.addListener(t,"click",function(i){"_current"in n&&n._current.close(),n[this.getTitle()].open(e,this),n._current=n[this.getTitle()]})},updateStats:function(e,n){if(n){a("."+e+" .miles span").text(n.miles),a("."+e+" .speed span").text(n.avg_speed),a("."+e+" .fuel span").text(n.fuel),a("."+e+" .brake span").text(n.brake);var i;if(n.runtime<60)i=n.runtime+" seconds";else if(n.runtime<3600)i=(n.runtime/60).toFixed(0)+" minutes";else{var l=Math.floor(runtime/3600),t=((runtime-3600*l)/60).toFixed(0);i=l+" hours and "+t+" minutes"}a("."+e+" .runtime").text(i)}}};e.exports=c}},[134]);
//# sourceMappingURL=index.js.map