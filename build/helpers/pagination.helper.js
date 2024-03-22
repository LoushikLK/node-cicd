"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ model, query, pageNo, perPage, sort = { createdAt: -1 }, populate, select, }) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const [firstPromise, secondPromise] = yield Promise.allSettled([
            model
                .find(query)
                .sort(sort)
                .skip((Number(pageNo || 0) - 1) * Number(perPage))
                .limit(Number(perPage) + 1)
                .populate(populate)
                .select(select),
            model.find(query).count(),
        ]);
        if ((firstPromise === null || firstPromise === void 0 ? void 0 : firstPromise.status) === "rejected")
            throw new Error((_a = firstPromise === null || firstPromise === void 0 ? void 0 : firstPromise.reason) === null || _a === void 0 ? void 0 : _a.message);
        if ((secondPromise === null || secondPromise === void 0 ? void 0 : secondPromise.status) === "rejected")
            throw new Error((_b = secondPromise === null || secondPromise === void 0 ? void 0 : secondPromise.reason) === null || _b === void 0 ? void 0 : _b.message);
        const totalLength = (_c = firstPromise.value) === null || _c === void 0 ? void 0 : _c.length;
        if (totalLength > Number(perPage))
            firstPromise.value.pop();
        resolve({
            data: firstPromise.value,
            isLastChunk: !(totalLength > Number(perPage)),
            totalCount: secondPromise === null || secondPromise === void 0 ? void 0 : secondPromise.value,
            perPage: Number(perPage),
            pageNo: Number(pageNo),
        });
    }
    catch (error) {
        reject(error);
    }
}));
