export const collectionType = {
  name: "collection",
  title: "Occasion Collections",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "typicalInclusions",
      title: "Typical Inclusions",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
  ],
};

export const productType = {
  name: "product",
  title: "Curated Products & Pieces",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    },
    {
      name: "collection",
      title: "Belongs to Collection",
      type: "reference",
      to: [{ type: "collection" }],
    },
    {
      name: "group",
      title: "Category / Group",
      type: "string",
    },
    {
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    },
  ],
};

export const faqType = {
  name: "faq",
  title: "Frequently Asked Questions",
  type: "document",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "group",
      title: "Group / Category",
      type: "string",
      options: {
        list: [
          { title: "Process", value: "Process" },
          { title: "Orders", value: "Orders" },
          { title: "Customization", value: "Customization" },
          { title: "Payments", value: "Payments" },
          { title: "Delivery", value: "Delivery" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "order",
      title: "Order within Group",
      type: "number",
    },
  ],
};

export const testimonialType = {
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "role",
      title: "Role / Designation",
      type: "string",
    },
    {
      name: "company",
      title: "Company",
      type: "string",
    },
    {
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "image",
      title: "Client Photo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "visible",
      title: "Publish to Website",
      type: "boolean",
      description: "Only published testimonials with real client permission will appear on the live site.",
      initialValue: false,
    },
  ],
};

export const clientLogoType = {
  name: "clientLogo",
  title: "Client Partner Logos",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Company Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "logo",
      title: "Logo (SVG or PNG)",
      type: "image",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "visible",
      title: "Publish to Website",
      type: "boolean",
      initialValue: false,
    },
  ],
};

export const siteSettingsType = {
  name: "siteSettings",
  title: "Site Global Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Brand Name",
      type: "string",
      initialValue: "Naqsh",
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Crafting Lasting Impressions",
    },
    {
      name: "slogan",
      title: "Slogan",
      type: "string",
      initialValue: "Beyond the box, into an experience!",
    },
    {
      name: "phone",
      title: "Phone Display",
      type: "string",
    },
    {
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
    },
    {
      name: "email",
      title: "Official Email Address",
      type: "string",
    },
    {
      name: "location",
      title: "Studio Location",
      type: "string",
      initialValue: "Lahore, Pakistan",
    },
  ],
};

export const schemaTypes = [
  collectionType,
  productType,
  faqType,
  testimonialType,
  clientLogoType,
  siteSettingsType,
];
