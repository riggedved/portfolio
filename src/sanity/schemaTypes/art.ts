import { defineField, defineType } from 'sanity';

export const artType = defineType({
    name: 'art',
    title: 'Photos & Art',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title / Caption (Optional)',
            type: 'string',
            description: 'Optional caption or title. Leave blank if you only want the photo without text.',
        }),
        defineField({
            name: 'image',
            title: 'Photo / Image',
            type: 'image',
            options: { hotspot: true },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'instagramPostUrl',
            title: 'Instagram Post URL (optional)',
            type: 'url',
            description: 'Direct link to this post on Instagram',
        }),
        defineField({
            name: 'aspectRatio',
            title: 'Display Aspect Ratio',
            type: 'string',
            description: 'Natural/Auto displays original photo dimensions according to their sizes (Pinterest style).',
            options: {
                list: [
                    { title: 'Natural / Auto (Pinterest Style)', value: 'auto' },
                    { title: 'Square (1:1)', value: 'square' },
                    { title: 'Circle (1:1 Rounded)', value: 'circle' },
                    { title: 'Portrait (4:5 Crop)', value: 'portrait' },
                    { title: 'Landscape (16:9 Crop)', value: 'landscape' },
                ],
                layout: 'radio',
            },
            initialValue: 'auto',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
        prepare(selection) {
            const { title, media } = selection;
            return {
                title: title || 'Photo (No Title)',
                media,
            };
        },
    },
});
