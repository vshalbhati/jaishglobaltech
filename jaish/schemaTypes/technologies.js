import { defineType} from 'sanity'

export default defineType({
  name: 'technologies',
  title: 'Technologies',
  type: 'document',
  fields: [
    {
      name:"name",
      type:"string",
      title: "Technology name",
      validation: (Rule) => Rule.required(),
    },
    {
        name: "konsicategory",
        title: "Konsi Category",
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
      name: "category",
      title: "Technology Category",
      type: "string",
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
      title:"Image of the Technology",
    },
  ],
})
