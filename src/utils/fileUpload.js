import firebase from "firebase/compat/app";

export function uploadFile(file) {

    return new Promise((resolve, reject) => {

        var storageRef = firebase
            .storage()
            .ref("naskah/" + file.name)
            .put(file);

        storageRef.on(
            "state_changed",
            (snapshot) => {
                console.log(snapshot);
            },
            (error) => {
                reject(error.message)
            },
            () => {

                storageRef.snapshot.ref.getDownloadURL().then((resp) => {
                    resolve(resp)
                });
            }
        );
    })
}

export function uploadFileBlob(file, filename) {

    return new Promise((resolve, reject) => {

        var storageRef = firebase
            .storage()
            .ref("naskah/" + filename)
            .put(file);

        storageRef.on(
            "state_changed",
            (snapshot) => {
                resolve({
                    status: snapshot.state,
                    byte_transfered: snapshot.bytesTransferred,
                    total_byte: snapshot.totalBytes,
                    percentage: ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed()
                })
                console.log(snapshot);
            },
            (error) => {
                reject(error.message)
            },
            () => {
                storageRef.snapshot.ref.getDownloadURL().then((resp) => {
                    resolve({
                        status: 'done',
                        url: resp
                    })
                });
            }
        );
    })
}