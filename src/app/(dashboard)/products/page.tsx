import ProductGridView from "./ProductGridView";


const GENDER_OPTIONS = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' },
];

const CATEGORY_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'apparel', label: 'Apparel' },
    { value: 'accessories', label: 'Accessories' },
];

const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRICE_OPTIONS = [
    { value: 'below', label: 'Below $25' },
    { value: 'between', label: 'Between $25 - $75' },
    { value: 'above', label: 'Above $75' },
];

const COLOR_OPTIONS = [
    '#00AB55',
    '#000000',
    '#FFFFFF',
    '#FFC0CB',
    '#FF4842',
    '#1890FF',
    '#94D82D',
    '#FFC107',
];

const defaultFilters = {
    price: '',
    gender: [GENDER_OPTIONS[0].value],
    colors: [COLOR_OPTIONS[4]],
    rating: RATING_OPTIONS[0],
    category: CATEGORY_OPTIONS[0].value,
};

const filterOptions = 
    {
        genders: GENDER_OPTIONS,
        categories: CATEGORY_OPTIONS,
        ratings: RATING_OPTIONS,
        price: PRICE_OPTIONS,
        colors: COLOR_OPTIONS,
    }

export default function ProductsPage() {
    return (
        <ProductGridView defaultFilters={defaultFilters} filterOptions={filterOptions} />
    )

}


