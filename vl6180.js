// ==============================================================================
/**
    @file       vl6180.js
    @brief      Node-RED support for the VL6180.
    @author     Ondrej Miko
    @version    1.0.4

    @copyright 2022 Ondrej Miko
    @attention
    <b><center>&copy; Copyright (c) 2022 Ondrej MIko</center></b>
    Licensed under Mozilla Public License, v. 2.0 (MPL-2.0), a flexible license
    that just requires that source changes are returned to the community.
    If a copy of the MPL-2.0 was not distributed with this file,
    you can obtain one at http://mozilla.org/MPL/2.0/.
    @see  LICENSE
    @see  NOTICE
*/
// ==============================================================================

const {spawn} = require("child_process");
module.exports = function(RED) {

	var gpioCommand = __dirname+'/vl6180';

	function Vl6180Node(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			node.child = spawn(gpioCommand,[config.address,config.offset]);

			node.child.stdout.on('data', function(data) {
				if (RED.settings.verbose) { node.log("out: " + data + " :"); }
				// Parse data
				data = data.toString().trim();
				data=data.replaceAll("'","\"");
				msg.payload=parseInt(data);
				// Send data to node
				node.send(msg);
			});

			node.child.stderr.on('data', function(data) {
				if (RED.settings.verbose) { node.log("err: " + data + " :"); }
			});

			node.child.on('close', function(code) {
				if (RED.settings.verbose) { node.log("ret: " + code + " :"); }
				node.child = null;
				node.running = false;
			});

			node.child.on('error', function(err) {
				if (err.errno === "ENOENT") { node.warn('Command not found'); }
				else if (err.errno === "EACCES") { node.warn('Command not executable'); }
				else { node.log('error: ' + err); }
			});

		});
	}
	RED.nodes.registerType("vl6180",Vl6180Node);
}
