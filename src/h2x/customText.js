import { JSXAttribute } from 'h2x-plugin-jsx'

const customText = (text, tags) => {
  const split = text.split('=')
  const attr = split[0]
  const value = split[1]
  const tagList = tags.split(',')

  return (text, tags) => ({
    visitor: {
      JSXElement: {
        enter(path) {
          if (tagList.includes(path.node.name) && !path.node.attributes.some(a => a && a.name === attr)) {
            const props = new JSXAttribute()
            props.name = attr
            props.value = value
            props.literal = true
            path.node.attributes.push(props)
            path.replace(path.node)
          }
        },
      },
    },
  })
}

export default customText
