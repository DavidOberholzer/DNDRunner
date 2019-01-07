export const RESOURCE_FIELDS = {
    campaign: [
        { name: 'name', type: 'text', label: 'Name', value: '', required: true },
        { name: 'description', type: 'text', label: 'Description', value: '' },
        { name: 'day', type: 'number', label: 'Day', value: 1, required: true },
        { name: 'time_of_day', type: 'time', label: 'Time of Day', value: '07:30', required: true }
    ],
    player: [
        { name: 'name', type: 'text', label: 'Name', value: '', required: true },
        { name: 'health', type: 'number', label: 'Health', value: 0, required: true },
        {
            name: 'current_health',
            type: 'number',
            label: 'Current Health',
            value: 0,
            required: true
        },
        {
            name: 'carry_capacity',
            type: 'number',
            label: 'Carry Capacity',
            value: 0,
            required: true
        },
        {
            name: 'level',
            type: 'number',
            label: 'Level',
            value: 1,
            required: true
        },
        {
            name: 'experience',
            type: 'number',
            label: 'Experience',
            value: 0,
            required: true
        },
        {
            name: 'avatar',
            type: 'image',
            label: 'Avatar',
            value: ''
        },
        {
            name: 'alive',
            type: 'boolean',
            label: 'Alive',
            value: true
        }
    ],
    battle: [
        { name: 'name', type: 'text', label: 'Name', value: '', required: true },
        {
            name: 'description',
            type: 'text',
            label: 'Description',
            value: ''
        },
        {
            name: 'experience',
            type: 'number',
            label: 'XP Reward',
            value: 0
        }
    ],
    enemy: [
        { name: 'name', type: 'text', label: 'Name', value: '', required: true },
        { name: 'health', type: 'number', label: 'Health', value: 0, required: true },
        {
            name: 'current_health',
            type: 'number',
            label: 'Current Health',
            value: 0,
            required: true
        },
        {
            name: 'level',
            type: 'number',
            label: 'Level',
            value: 1,
            required: true
        },
        {
            name: 'avatar',
            type: 'image',
            label: 'Avatar',
            value: ''
        },
        {
            name: 'alive',
            type: 'boolean',
            label: 'Alive',
            value: true
        }
    ],
    item: [
        {
            name: 'player_id',
            type: 'select',
            label: 'Player',
            value: '',
            values: 'Players',
            global: true,
            required: true
        },
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            value: '',
            required: true
        },
        {
            name: 'weight',
            type: 'number',
            label: 'Weight',
            value: 0,
            required: true
        }
    ]
};
