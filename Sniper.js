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
