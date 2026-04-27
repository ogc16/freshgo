export const PRODUCTS = {
  groceries: [
    { id: 1,  name: 'Fresh Tomatoes',   unit: '1kg bag',     price: 3500,   emoji: '🍅', tag: 'Fresh',       tagColor: '#E8F5EC', tagTxt: '#1C5C35', bg: '#FFF5F5' },
    { id: 2,  name: 'Cooking Oil',      unit: '2L bottle',   price: 14500,  emoji: '🫙', tag: 'Essential',   tagColor: '#FFF3D6', tagTxt: '#9A6800', bg: '#FFFBF0' },
    { id: 3,  name: 'Basmati Rice',     unit: '5kg bag',     price: 28000,  emoji: '🍚', tag: 'Best Seller', tagColor: '#E3F2FD', tagTxt: '#0D5CA6', bg: '#F5F9FF' },
    { id: 4,  name: 'Red Onions',       unit: '1kg',         price: 2500,   emoji: '🧅', tag: 'Fresh',       tagColor: '#E8F5EC', tagTxt: '#1C5C35', bg: '#FFF5F0' },
    { id: 5,  name: 'Whole Bread',      unit: '700g loaf',   price: 5500,   emoji: '🍞', tag: 'Baked Today', tagColor: '#FFF3D6', tagTxt: '#9A6800', bg: '#FFF8F0' },
    { id: 6,  name: 'Farm Eggs',        unit: 'Tray of 30',  price: 18000,  emoji: '🥚', tag: 'Farm Fresh',  tagColor: '#E8F5EC', tagTxt: '#1C5C35', bg: '#FAFFF5' },
    { id: 7,  name: 'Sweet Bananas',    unit: '1 bunch',     price: 3000,   emoji: '🍌', tag: 'Fresh',       tagColor: '#E8F5EC', tagTxt: '#1C5C35', bg: '#FFFFF0' },
    { id: 8,  name: 'Sugar (2kg)',      unit: '2kg bag',     price: 8500,   emoji: '🍬', tag: 'Essential',   tagColor: '#FFF3D6', tagTxt: '#9A6800', bg: '#FFF9F5' },
  ],
  food: [
    { id: 9,  name: 'Chicken Biryani',  unit: '1 plate',     price: 12000,  emoji: '🍛', tag: 'Hot & Ready', tagColor: '#FFF3D6', tagTxt: '#9A6800', bg: '#FFF8F0' },
    { id: 10, name: 'Rolex (Ugandan)',  unit: '2 eggs',      price: 4000,   emoji: '🌯', tag: 'Street Fave', tagColor: '#FCE4EC', tagTxt: '#880E4F', bg: '#FFF5F8' },
    { id: 11, name: 'Matoke Stew',      unit: '1 portion',   price: 8000,   emoji: '🍲', tag: 'Local',       tagColor: '#E8F5EC', tagTxt: '#1C5C35', bg: '#F5FFF7' },
    { id: 12, name: 'Pork Muchomo',     unit: '6 sticks',    price: 10000,  emoji: '🍢', tag: 'Grilled',     tagColor: '#FCE4EC', tagTxt: '#880E4F', bg: '#FFF5F5' },
    { id: 13, name: 'Samosa (4pcs)',    unit: '4 pieces',    price: 4000,   emoji: '🥟', tag: 'Crispy',      tagColor: '#FFF3D6', tagTxt: '#9A6800', bg: '#FFFBF0' },
    { id: 14, name: 'Fresh Juice',      unit: '500ml',       price: 5000,   emoji: '🥤', tag: 'Cold',        tagColor: '#E3F2FD', tagTxt: '#0D5CA6', bg: '#F0F9FF' },
    { id: 15, name: 'Pilau Rice',       unit: '1 plate',     price: 9000,   emoji: '🍜', tag: 'Spicy',       tagColor: '#FFF3D6', tagTxt: '#9A6800', bg: '#FFFAF0' },
    { id: 16, name: 'Mandazi (6pcs)',   unit: '6 pieces',    price: 3000,   emoji: '🍩', tag: 'Freshly Made',tagColor: '#E8F5EC', tagTxt: '#1C5C35', bg: '#FAFFF8' },
  ],
  gas: [
    { id: 17, name: '6kg Gas Cylinder', unit: 'Full cylinder', price: 85000, emoji: '🔴', tag: 'Cooking Gas', tagColor: '#FCE4EC', tagTxt: '#880E4F', bg: '#FFF5F5' },
    { id: 18, name: '13kg Cylinder',    unit: 'Full cylinder', price: 165000,emoji: '🟠', tag: 'Large Size',  tagColor: '#FFF3D6', tagTxt: '#9A6800', bg: '#FFF8F0' },
    { id: 19, name: 'Gas Refill 6kg',   unit: 'Refill only',  price: 55000, emoji: '⛽', tag: 'Refill',      tagColor: '#E8F5EC', tagTxt: '#1C5C35', bg: '#F5FFF7' },
    { id: 20, name: 'Gas Refill 13kg',  unit: 'Refill only',  price: 110000,emoji: '🔥', tag: 'Refill',      tagColor: '#E8F5EC', tagTxt: '#1C5C35', bg: '#F5FFF7' },
  ],
  water: [
    { id: 21, name: '20L Jerry Can',    unit: 'Jerry can refill', price: 2000,  emoji: '🪣', tag: 'Refill',  tagColor: '#E3F2FD', tagTxt: '#0D5CA6', bg: '#F0F9FF' },
    { id: 22, name: '10L Bottle',       unit: 'Sealed bottle',    price: 5500,  emoji: '💧', tag: 'Sealed',  tagColor: '#E3F2FD', tagTxt: '#0D5CA6', bg: '#F0FAFF' },
    { id: 23, name: '5L Bottle',        unit: 'Sealed bottle',    price: 3000,  emoji: '🍶', tag: 'Sealed',  tagColor: '#E3F2FD', tagTxt: '#0D5CA6', bg: '#F0FAFF' },
    { id: 24, name: '500ml × 12 Pack',  unit: 'Crate',            price: 14400, emoji: '🧊', tag: 'Chilled', tagColor: '#E8F5EC', tagTxt: '#1C5C35', bg: '#F5FFFD' },
  ],
}

export const ALL_PRODUCTS = Object.values(PRODUCTS).flat()

export const CATEGORY_META = {
  groceries: { label: 'Groceries', emoji: '🥦', color: '#EAF5EC' },
  food:       { label: 'Food',      emoji: '🍛', color: '#FFF3E0' },
  gas:        { label: 'Gas',       emoji: '🔥', color: '#FFF0F0' },
  water:      { label: 'Water',     emoji: '💧', color: '#E3F2FD' },
}

export const fmt = (n) => 'UGX ' + Number(n).toLocaleString()
