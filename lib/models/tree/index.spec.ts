import Tree, { ITreeNodeProps } from ".";
import { describe, expect, test } from "vitest";

interface ITestTreeNodeProps extends ITreeNodeProps {
    id: number,
    name: string
}

describe("tree", () => {
    const createTree = () => {
        return new Tree<ITestTreeNodeProps>({
            id: 0,
            name: "0",
            children: [
                {
                    id: 1,
                    name: "1",
                }, {
                    id: 2,
                    name: "2",
                    children: [
                        {
                            id: 3,
                            name: "3"
                        }
                    ]
                }
            ]
        })
    }
    test("getNodesByLevel", () => {
        const tree = createTree();
        expect(tree.getNodesByLevel(1).length).toBe(2);
        expect(tree.getNodesByLevel(2).length).toBe(1);
    });

    test("getNodeById",()=>{
        const tree = createTree();
        expect(tree.getNodeById(1)?.name).toBe("1");
        expect(tree.getNodeById(2)?.name).toBe("2");

        expect(tree.getNodeById(-1)).toBeUndefined();
    });

    test("delNodeById",()=>{
        const tree = createTree();
        expect(tree.getNodeById(1)).not.toBeUndefined();
        tree.delNodeById(1);
        expect(tree.getNodeById(1)).toBeUndefined();
    });
})