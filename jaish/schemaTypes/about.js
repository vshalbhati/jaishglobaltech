import { defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name:"name",
      type:"string",
      title: "Person name",
      validation: (Rule) => Rule.required(),
    },
    {
      name:"post",
      type:"string",
      title: "Post",
      validation: (Rule) => Rule.required(),
    },
    {
      name:"description",
      type:"string",
      title: "Description",
      validation: (Rule) => Rule.min(200),
    },
    {
      name:"image",
      type:"image",
      title:"Image of the Person",
    },
    { 
        name: 'videos',
        title: 'Videos',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'video' }] }],
        description: 'Add related videos for the Person',
    }      
  ],
})
