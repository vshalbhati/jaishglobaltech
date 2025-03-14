import { defineType} from 'sanity'

export default defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  fields: [
    {
      name:"name",
      type:"string",
      title: "Service name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Cyber Security", value: "cyber" },
          { title: "AI & ML", value: "ai" },
          { title: "Software Development", value: "software" },
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name:"short_description",
      type:"string",
      title: "Short Description",
      validation: (Rule) => Rule.min(50),
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
      title:"Image of the Service",
    },
    {
      name:"images",
      type:"array",
      title:"Images of the Service",
      of: [{ type: 'image'}],
    },
    { 
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'string'}],
    },
    { 
        name: 'videos',
        title: 'Videos',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'video' }] }],
        description: 'Add related videos for the service',
    }      
  ],
})
