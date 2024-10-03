import { defineType} from 'sanity'

export default defineType({
  name: 'tnd',
  title: 'tnd',
  type: 'document',
  fields: [
    {
      name:"descriptionupar",
      type:"array",
      title: "Description upar",
      of: [{type: 'block'}]
    },
    {
      name:"descriptionniche",
      type:"array",
      title: "Description niche",
      of: [{type: 'block'}]
    },
    {
      name:"image",
      type:"image",
      title:"Image of the Service",
    },
    {
      name:"images",
      type:"array",
      title:"Images of the Service",
      of: [{ type: 'image'}],
    }    
  ],
})
