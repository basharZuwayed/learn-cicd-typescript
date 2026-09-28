import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "../api/auth.js"
import { describe, expect, it } from "vitest";

describe("getAPIKey", () => {
    it("returns the API key from a valid authorization header", () => {
        const headers: IncomingHttpHeaders = {
            authorization: "ApiKey abc123$$",
        };

        expect(getAPIKey(headers)).toBe("abc123$$");
    });

    it.each<[string, IncomingHttpHeaders]>([
        ["the authorization header is missing", {}],
        ["the authorization scheme is invalid", { authorization: "Bearer abc123$$" }],
        ["the API key is missing", { authorization: "ApiKey" }],
        [
            "the authorization header is null",
            { authorization: null } as unknown as IncomingHttpHeaders,
        ],
    ])("returns null when %s", (_reason, headers) => {
        expect(getAPIKey(headers)).toBeNull();
    });
});
