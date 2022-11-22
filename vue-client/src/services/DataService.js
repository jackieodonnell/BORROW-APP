import axios from "axios";

export default {

    async getData(){
        return await axios.get("/api/v1/data/admin").then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err)
        });
    }

}