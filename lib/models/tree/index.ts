import { TTreeNode } from "../../types";

export interface ITreeNodeProps<TNodeId> {
    id: TNodeId
}

export default class Tree<TNodeId extends string | number, T extends ITreeNodeProps<TNodeId>>{
    private _node: TTreeNode<T>;

    get root() {
        return this._node;
    }

    constructor(node: TTreeNode<T>) {
        this._node = node;
    }

    /**
     * 获取指定level的节点
     * @param level 
     * @returns 
     */
    getNodesByLevel(level: number) {
        let nodes = new Array<TTreeNode<T>>();

        if (level > 0 && Number.isInteger(level))
            this.traverse((n, l) => {
                if (l === level) {
                    nodes.push(n);
                    return true;
                }
            })

        return nodes;
    }

    /**
     * 通过id获取节点
     * @param id 
     * @returns 
     */
    getNodeById(id: TNodeId) {
        let node: TTreeNode<T> | undefined;

        this.traverse(n => {
            if (id === n.id) {
                node = n
                return true;
            }
        }, true);

        return node;
    }

    /**
     * 通过id删除节点
     * @param id 
     */
    delNodeById(id: TNodeId) {
        this.traverse((n, _, pn) => {
            if (n.id === id) {
                if (pn) pn.children?.splice(pn.children.indexOf(n), 1);
                return true;
            }
        }, true)
    }

    /**
     * 遍历所有节点
     * @param callback 操作节点和该节点的层级，如果返回true则中断子节点遍历，否则继续遍历子节点
     * @param breaking 当callback返回ture时是否停止遍历
     */
    traverse(callback: (node: TTreeNode<T>, level: number, pNode?: TTreeNode<T>) => (boolean | undefined), breaking?: boolean) {

        function recurse(currentNode: TTreeNode<T>, currntLevel: number, parentNode?: TTreeNode<T>): boolean | undefined {
            if (callback(currentNode, currntLevel, parentNode))
                return true;

            if (currentNode.children) {
                for (let i = 0; i < currentNode.children.length; i++) {
                    const b = recurse(currentNode.children[i], currntLevel + 1, currentNode);
                    if (b && breaking)
                        break;
                }
            }
        }

        recurse(this._node, 0);
    }
}