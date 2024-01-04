import THREE from "three"
import { INode } from "./three"
import {Text} from 'troika-three-text'

export default function (text: string, { x, y, z, radius }: INode) {
    const myText = new Text()
    myText.text = text
    myText.position.x = x
    myText.position.y = y
    myText.position.z = z + radius
    myText.fontSize = 22
    myText.fontWeight = "bold"
    myText.color = 0xffffFF
    myText.sync()
    this.text = myText
}
