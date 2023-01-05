
/*function countOrders() {
    let count = 0;
    get(child(ref(db), 'orders')).then((snapshot) => {
        if (snapshot.exists()) {
            count = snapshot.numChildren();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
    return String(count).padStart(6 - String(count).length, '0');
}

set(ref(db, 'orders/' + countOrders() + '/date'), {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
}).then(() => {
    set(ref(db, 'orders/' + countOrders() + '/items'), {
        
    }});*/