import { defineType} from 'sanity'

export default defineType({
  name: 'products',
  title: 'products',
  type: 'document',
  fields: [
    {
      name:"name",
      type:"string",
      title: "Product name",
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
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name:"short_description",
      type:"string",
      title: "Product Short Description",
      validation: (Rule) => Rule.min(50),
    },
    {
      name:"features",
      type:"array",
      title:"Features of the product",
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
      title:"Image of the Product",
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
        description: 'Add related videos for the product',
    }      
  ],
})
