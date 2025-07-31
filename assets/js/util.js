export function makeResponse(body = undefined){
    if(body === undefined){
        return {
            method: 'GET'
        }
    }else {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function throwHTTPError(ok, status){
    if(!ok){
        throw new Error(`HTTP error! status ${status}`);
    }
}

export function formatTanggalIndo(dateString) {
    const bulanIndo = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = bulanIndo[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}