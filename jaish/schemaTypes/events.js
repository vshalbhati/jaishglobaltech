import { defineType} from 'sanity'

export default defineType({
  name: 'events',
  title: 'Events',
  type: 'document',
  fields: [
    {
      name:"name",
      type:"string",
      title: "Event name",
      validation: (Rule) => Rule.required(),
    },
    {
        name:"date",
        type:"date",
        title: "Event date",
        validation: (Rule) => Rule.required(),

    },
    {
      name:"short_description",
      type:"string",
      title: "Event Short Description",
      validation: (Rule) => Rule.min(50),
    },
    {
      name:"keypoints",
      type:"array",
      title:"Key Points of the event",
      of: [{ type: 'string'}],
    },
    {
      name:"description",
      type:"array",
      title: "Description",
      of: [{type: 'block'}]
    },
    {
      name:"image",
      type:"image",
      title:"Image of the event",
    },
    {
      name:"images",
      type:"array",
      title:"Images of the event",
      of: [{ type: 'image'}],
    },
    { 
        name: 'videos',
        title: 'Videos',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'video' }] }],
        description: 'Add related videos for the product',
    }      
  ],
})