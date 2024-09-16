<script>
    import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '$lib/firebase';
    let items = $state([])
    let newItem = $state({name:'',})
    let total = $state(0)


    const addItem = async (e) => {
        console.log('I ran')
    e.preventDefault();
    if (newItem.name !== '' && newItem.price !== '') {
     items=[...items, newItem]
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      newItem= { name: '', price: '' }
    }
  };

  const q = query(collection(db, 'items'));
   onSnapshot(q, (querySnapshot) => {
    let itemsArr = [];

    querySnapshot.forEach((doc) => {
      itemsArr.push({ ...doc.data(), id: doc.id });
    });
    items = itemsArr;

    const calculateTotal = () => {
      const totalPrice = itemsArr.reduce(
        (sum, item) => sum + parseFloat(item.price),
        0
      );
      total = totalPrice;
    };
    calculateTotal();
  });


  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  }

</script>

<main class='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4'>
    <div class='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm '>
      <h1 class='text-4xl p-4 text-center'>Expense Tracker</h1>
      <div class='bg-slate-800 p-4 rounded-lg'>
        <form class='grid grid-cols-6 items-center text-black'>
          <input
            bind:value={newItem.name}
            class='col-span-3 p-3 border'
            type='text'
            placeholder='Enter Item'
          />
          <input
            bind:value={newItem.price}
            class='col-span-2 p-3 border mx-3'
            type='number'
            placeholder='Enter $'
          />
          <button
            onclick={addItem}
            class='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl'
          >
            +
          </button>
        </form>
        <ul>
            {#each items as item}
            <li
            class='my-4 w-full flex justify-between bg-slate-950'
          >
            <div class='p-4 w-full flex justify-between text-white'>
              <span class='capitalize'>{item.name}</span>
              <span>${item.price}</span>
            </div>
            <button
              onclick={() => deleteItem(item.id)}
              class='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16 text-white'
            >
              X
            </button>
          </li>
            {/each}
        </ul>
        {#if items.length<1}
            
            {:else}
            <div class='flex justify-between p-3 text-white'>
                <span>Total</span>
                <span>${total}</span>
              </div>
        {/if}
      </div>
    </div>
  </main>
