import firebase from "firebase/compat/app";

export function uploadFile(file) {

    return new Promise((resolve, reject) => {

        var storageRef = firebase
            .storage()
            .ref("docsOPD/" + file.name)
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
                    // console.log();

                });
            }
        );

    })

}

export function uploadImage(file) {

    return new Promise((resolve, reject) => {

        var storageRef = firebase
            .storage()
            .ref("gallery-silaper/" + file.name)
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
                    // console.log();

                });
            }
        );

    })

}