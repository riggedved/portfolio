import { defineField, defineType } from 'sanity';

export const problemSolvingType = defineType({
    name: 'problemSolving',
    title: 'Problem Solving (LeetCode)',
    type: 'document',
    fields: [
        defineField({
            name: 'platform',
            title: 'Platform Name',
            type: 'string',
            initialValue: 'LeetCode',
            description: 'e.g. LeetCode',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'username',
            title: 'LeetCode ID / Username',
            type: 'string',
            description: 'Your LeetCode ID (displayed like the company name, e.g. riggedved)',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'problemsSolved',
            title: 'Problems Solved',
            type: 'string',
            description: 'e.g. 500+ problems solved, or 450+ solved',
        }),
        defineField({
            name: 'contestRating',
            title: 'Contest Rating / Badge',
            type: 'string',
            description: 'e.g. 1750 rating, Knight badge, top 8%',
        }),
        defineField({
            name: 'profileUrl',
            title: 'Profile URL',
            type: 'url',
            description: 'Link to your LeetCode profile (e.g. https://leetcode.com/u/riggedved)',
        }),
        defineField({
            name: 'logo',
            title: 'Platform Logo (Optional)',
            type: 'image',
            options: { hotspot: true },
            description: 'Upload a custom logo if desired (leave empty to use the built-in LeetCode logo)',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
            initialValue: 1,
        }),
    ],
    preview: {
        select: {
            title: 'username',
            subtitle: 'platform',
            media: 'logo',
        },
        prepare(selection) {
            const { title, subtitle, media } = selection;
            return {
                title: title ? `${title} (${subtitle || 'LeetCode'})` : 'LeetCode Profile',
                subtitle: subtitle || 'LeetCode',
                media,
            };
        },
    },
});
