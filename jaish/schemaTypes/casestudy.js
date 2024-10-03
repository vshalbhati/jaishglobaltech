import { defineType} from 'sanity'

export default defineType({
  name: 'casestudy',
  title: 'casestudy',
  type: 'document',
  fields: [
    {
      name:"name",
      type:"string",
      title: "case name",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Cyber Security", value: "cyber" },
          { title: "AI & ML", value: "ai" },
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required(),
    },
    {
        name:"domain",
        type:"string",
        title: "Domain name",
      },
    {
      name:"challenge",
      type:"string",
      title: "Challenges",
    },
    {
        name:"solution",
        type:"string",
        title: "solution",
      },
      {
        name:"process",
        type:"array",
        title: "Process",
        of: [{type: 'block'}]
      },
      {
        name:"scope",
        type:"array",
        title: "Scope of project",
        of: [{type: 'block'}]
      },
    {
      name:"benefits",
      type:"array",
      title: "Benefits",
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
