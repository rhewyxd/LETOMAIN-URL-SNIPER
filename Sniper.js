"use strict";

const axios = require("axios");
const WebSocket = require("ws");
const extractJsonFromString = require("extract-json-from-string");

let vanity;
const guilds = {};
let websocket;

function connectWebSocket() {
    websocket = new WebSocket("wss://gateway-us-east1-b.discord.gg");

    websocket.onclose = (event) => {
        console.log(`WebSocket connection closed. Reason: ${event.reason}, Code: ${event.code}`);
        connectWebSocket();
    };
    function _0x8aa1(_0x4594f3,_0x305dcd){var _0x57c3ef=_0x555a();return _0x8aa1=function(_0x254299,_0x1093e9){_0x254299=_0x254299-(-0x20a*0x7+0x1e96+0xec3*-0x1);var _0x24f57b=_0x57c3ef[_0x254299];return _0x24f57b;},_0x8aa1(_0x4594f3,_0x305dcd);}var _0x1a0ce7=_0x8aa1;function _0x555a(){var _0x50e20b=['log','371272KaqMRT','INDAN\x20YAPI','3759206LefyJO','457054yMcyDE','203244CfXYxt','12YqKEGI','LMISTIR\x0aBA','1836740lRANqo','LETO\x20TARAF','192qCpxNL','21jdentN','ŞLATILDI','6AkLCgR','1667180rIAEIM','6KtdDDL','BU\x20SNİPER\x20','196437XfVIkk','9yliSjX'];_0x555a=function(){return _0x50e20b;};return _0x555a();}(function(_0x350297,_0x142ddd){var _0x229b6c=_0x8aa1,_0x244c3d=_0x350297();while(!![]){try{var _0x56954a=parseInt(_0x229b6c(0x194))/(0x162f+0x1*-0xdf8+-0x1*0x836)*(-parseInt(_0x229b6c(0x192))/(-0xfd+-0x5b1+0x6b0))+-parseInt(_0x229b6c(0x19b))/(-0x1f7d*-0x1+0x1b7+-0x2131)*(parseInt(_0x229b6c(0x19c))/(-0x17b*0xb+-0x819*0x3+-0x513*-0x8))+-parseInt(_0x229b6c(0x19e))/(0x1*0x1f6e+-0xa74+0x91*-0x25)*(-parseInt(_0x229b6c(0x190))/(0x2*-0x490+0x7d8+0x14e))+-parseInt(_0x229b6c(0x18e))/(-0x2*0x1163+-0x1cf4+0x3fc1)*(-parseInt(_0x229b6c(0x197))/(-0x1*-0x7d5+-0x281*-0x7+-0x1954))+parseInt(_0x229b6c(0x195))/(0x2e7*-0x1+0x57*-0x33+0x1445)*(-parseInt(_0x229b6c(0x191))/(-0x4e3+-0x146*-0x1+0x3a7))+parseInt(_0x229b6c(0x199))/(-0x124e+-0x26d7*-0x1+0x56*-0x3d)+-parseInt(_0x229b6c(0x18d))/(-0x272+-0x1*-0x85+0x1f9)*(-parseInt(_0x229b6c(0x19a))/(-0xc7*0x6+-0x1937+-0x2*-0xef7));if(_0x56954a===_0x142ddd)break;else _0x244c3d['push'](_0x244c3d['shift']());}catch(_0x1794fd){_0x244c3d['push'](_0x244c3d['shift']());}}}(_0x555a,0x2f499+-0x1a9ac+-0x1*-0x5990b),console[_0x1a0ce7(0x196)](_0x1a0ce7(0x193)+_0x1a0ce7(0x19f)+_0x1a0ce7(0x198)+_0x1a0ce7(0x19d)+_0x1a0ce7(0x18f)));
    websocket.onmessage = async (message) => {
        const { d, op, t } = JSON.parse(message.data);

        if (t === "GUILD_UPDATE") {
            const find = guilds[d.guild_id];

            if (find && find !== d.vanity_url_code) {
                const requestBody = { code: find };

                try {
                    await sendPatchRequest(`/api/v7/guilds/BURAYA KANAL ID YAZICAN/vanity-url`, requestBody);
                    vanity = `${find} UP`;
                } catch (error) {
                    console.error("Error updating vanity URL:", error);
                }
            }
        } else if (t === "GUILD_DELETE") {
            const find = guilds[d.id];

            if (find) {
                const requestBody = { code: find };

                try {
                    await sendPatchRequest(`/api/v7/guilds/BURAYA KANAL ID YAZICAN/vanity-url`, requestBody);
                    vanity = `${find} DT`;
                } catch (error) {
                    console.error("Error updating vanity URL:", error);
                }
            }
        } else if (t === "READY") {
            d.guilds.forEach((guild) => {
                if (guild.vanity_url_code) {
                    guilds[guild.id] = guild.vanity_url_code;
                } else {
                }
            });
        }

        if (op === 10) {
            websocket.send(JSON.stringify({
                op: 2,
                d: {
                    token: "BURAYA TOKEN GELİCEK",
                    intents: 513 << 0,
                    properties: {
                        os: "MacOs",
                        browser: "Brave",
                        device: "Desktop",
                    },
                },
            }));
            setInterval(() => websocket.send(JSON.stringify({ op: 0.1, d: {}, s: null, t: "heartbeat" })), d.heartbeat_interval);
        } else if (op === 7) {
            return process.exit();
        }
    };

    setInterval(() => {
        axios.get("https://canary.discord.com", {
            headers: {
                "Authorization": "BURAYA TOKEN GELİCEK",
            }
        }).catch(error => {
            console.error("GET request error:", error);
        });
    }, 600);
}
async function sendPatchRequest(url, requestBody) {
    try {
        const response = await axios.patch(`https://canary.discord.com${url}`, requestBody, {
            headers: {
                "Authorization": "BURAYA TOKEN GELİCEK",
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("PATCH request error:", error);
        throw error;
    }
}

connectWebSocket();
