"use strict";
/*
gen_songs_list.ts updates songsList.ts based on data given by YoutubeAPI.

How to run:
$ export YOUTUBE_API_KEY='put your youtube api key'
# SEE how to get youtube API key
#   - here: https://qiita.com/iroiro_bot/items/1016a6a439dfb8d21eca
#   - or here: https://developers.google.com/youtube/registering_an_application
$ yarn buildScripts
$ yarn genSongsList
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var fs_1 = __importDefault(require("fs"));
/************************************
 * const values / properties
 * **********************************/
var API_ENDPOINT = "https://youtube.googleapis.com/youtube/v3/playlistItems";
var PART = "id,contentDetails,snippet,status";
// This is omesis's official playlist for their "Utattemita"
// SEE: https://www.youtube.com/playlist?list=PLjUYRJfqz5WsaAcHvdt6Qv5gaERy75fej
var PLAYLIST_ID = "PLjUYRJfqz5WsaAcHvdt6Qv5gaERy75fej";
var YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
var SYNCHRONICITY_VIDEO_ID = "jis7E_mbwPw";
var JSON_FILE_PATH = __dirname + "/../preact/main/playlists/songsList.json";
/************************************
 * functions
 * **********************************/
/**
 * getSongList fetches song list from YoutubeAPI
 *
*/
function getSongList() {
    return __awaiter(this, void 0, void 0, function () {
        var songList, pageToken, sum, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    songList = [];
                    pageToken = "";
                    sum = 0;
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    console.log("fetching a page of playlist...");
                    return [4 /*yield*/, axios_1["default"].get(API_ENDPOINT + "?part=" + PART + "&playlistId=" + PLAYLIST_ID + "&key=" + YOUTUBE_API_KEY + "&pageToken=" + pageToken, {
                            headers: {
                                "Accept": "application/json"
                            }
                        })];
                case 2:
                    response = _a.sent();
                    if (response.status !== 200) {
                        throw "failed to retrieve response";
                    }
                    else {
                        sum += response.data.items.length;
                        console.log("retrieved a page successfully. num of items in this page: " + response.data.items.length + ", (sum:" + sum + " / total:" + response.data.pageInfo.totalResults + ")");
                    }
                    songList = __spreadArrays(songList, response.data.items.map(function (item) {
                        return {
                            title: item.snippet.title,
                            videoID: item.contentDetails.videoId,
                            // The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of 0, the second item has a position of 1, and so forth.
                            // SEE: https://developers.google.com/youtube/v3/docs/playlistItems#resource
                            position: item.snippet.position
                        };
                    }));
                    if (response.data.nextPageToken === undefined) {
                        return [3 /*break*/, 3];
                    }
                    else {
                        pageToken = response.data.nextPageToken;
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, songList
                        .sort(sortOmesisSongs)
                        .map(function (item) { return ({ title: item.title, videoID: item.videoID }); })];
            }
        });
    });
}
/**
 * sortOmesisSongs sorts list of songs fetched from a playlist
 * sort order is:
 *   - basically, newer items come in the bottom and older ones come in top
 *   - Only exception is "Synchronicity". It always comes in first position
 *
*/
function sortOmesisSongs(a, b) {
    // synchronicity should be always located on top of the result.
    if (a.videoID === SYNCHRONICITY_VIDEO_ID) {
        return -1;
    }
    else if (b.videoID === SYNCHRONICITY_VIDEO_ID) {
        return 1;
    }
    else {
        return b.position - a.position;
    }
}
function writeToJsonFile(path, songList) {
    // Don't forget to add last linebreak
    var content = JSON.stringify(songList, null, 2) + "\n";
    fs_1["default"].writeFile(path, content, { flag: 'w' }, function (err) {
        if (err)
            throw err;
        console.log("finished writing song list into " + path);
    });
}
/************************************
 * main
 * **********************************/
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getSongList()];
            case 1:
                list = _a.sent();
                writeToJsonFile(JSON_FILE_PATH, list);
                return [2 /*return*/];
        }
    });
}); })();
