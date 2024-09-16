import * as fs from 'fs';
import Arweave from 'arweave';

(async () => {

    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
        timeout: 20000,
        logging: false,
    });

    // Upload Token JSON to Arweave
    const arJWT = {"kty":"RSA","n":"qI53I45gbfm70DaefwgW8ku54FsDRqsz38sZxiXTy7TfGfxfIHhTeVRSssMVEPHKPkmbJcnlrHLE1QsRxzESoc5oOU0CQPjuOtZ2avl3uYx6HPhrf0etQMdCeZSo9HapYMi4EjckKc4vOe9k31yXEhkbIie83tg8JKu0zcejfuzwGeHNt8EYelaTtZI76fGpk_QKplAaQd6JE6u2C6RjBULgUnt5aQknsZLFqPzmzTwzAEKcVCnXtTZ_UmhFiGu2YEIsEHg4cZcLABiMpE5fl6kJRYEqzcY45ps4KItpsAXr2wHwjXvU-2mzJIRbMnJhQWnAGtUiN2J9L_FfZ4ZhXjjqZK7484BLoLMFDs_aNQmuvYVuspEKNtqj40X3Yxl4rkzLRu6OB_S7RbHLPU_NQRMXDVUbgc02eSgX3Upt3RHTPCrk4X0k7qsqVVvNqH6I3YbSZFa6bILvuwkYTbM3YKZFe-Wtdte9CeKWoN-cXJ4LNcRtZP1mlUQhrPAMZ1oZOZys5dSZ-NEg53KI0LL-rcnDCKN47FZ8kbqZ-xixdTN4-ZuVuzVw1Xz3VkGizMkJsqutGtKdz36MgBxKr78y5GyiafY3PkNKR1T3QZt-Ybv31Xl7q3dZI8kkx-M_kf8-zxd2Bn9UHZ-eJJzXeFggsUhsJPAKncIUDutenQwsEeE","e":"AQAB","d":"XXi7ms0ern355-oSFNHwn6bcygzOkUbpemZPwbFCdUm1Gtz4B7KSX8siHR3PtdjP1aDN17PRmMMAYkBEOJj_AxnKdFQ_NraUra42dvYmrY-4PA6K1kdyTWTyeSe2VfLj1NcaNIe9ly1OxSr7Xl4jLJcdk-BDfbSeDZvmpOLbyMwuDbxJb2g2YclXGi6g6QfpiTGhIj9zgCmfDHiBeI1NmCJQ8YyldFjuWSvSTvcIKrICeld2B7o4c7Zn_tPyE0fgGBs6AlwYuO0Q3Zm_jHIl0p2blZ6elQQik8dp6hn9nu55r7awplUQc-dWv55iUGRbiIHTVU3yLpKAZ7DLvkYoAcjDClhHePiZj-ZWzApmlmOc6yDMqT-m2xv8RH3Y9cKu30PmutPFJY164awi7dzXAIrRtoXWiN5IDxHB8LB5AkIcCrKVQ3s6El0lbFe0-tpxB-QisYpQNJZI229xeiTyjni8crmijunDVJxiRwef4rSbtg-1ykHRgPZ-bMdADAIsNIxlU6_UIDsLt0yLaqOyE_mbAC6G7npTMajfqARJEETQyCQcmiNoZ05kiCp32el9DHWyiEwBKbmQmr5iBG3tJgxSed-E4W9slmHRTpl--8anvTSS4dfr1zQ2bsS13Inm4OZE1fyAeeudkZu_yIAwh1oVqstNfgAyyDXBZljDgE0","p":"1ehrjJ5sh2l-_Uz_nDXc0RQueLGQ8EcbB0-UeB6wHMuq1Z9nT6OWPFhvHH3snE_o4pD7bY5IaZIt5r93r38ZDVsBfquBL99p6lfB6-X1Vt5FOuU4mqpOPRm1ygr7RiYr9ODT6yaCbd-0Tl8dBcH1gyhJwjthDAOUZajIm-OMX9ZkijmT1_qfaT2ErRwok4HQAVHKavqSeqRqLEEt0VpXEvKX0nTMONQ2MOv_ilsGY6GIWamcY9caetZSDgJL-JyOPxHjUIGVsSWC01JuBlpr_O8AwndaHFNeHExcu_AwIzid8dbrgwJ_xFqqhQERnmOfynzEC8xuhQE7Ad0vpwL00w","q":"ybl5wV25M9LgvmY6Abd8EQyuL6vk9LDNkymzzqHZrqUf51qnlQ3sLP1G23vyTl--MBlp81mWMffP6oj2TNLsM9-miHgU1gbhEf_ESxre2lovcg0uWQ-13Puk-x0BO-NcTJ2DFq_j_eDeJJk0kH9e8AOCgCg9Eo8Ackfe7aR5yG_3FVNGyvTghca6eWLxF0pglc9uCeWPQ7l4kY6FKaKcgRc6XkJI_OPGk2h93dFl3q03zerpDc4njUO2eE28yocfLNXYNbRpecOh2qk53q7H-EcF-noDVKD6jdjpaowyyT3wiAVeTX9kgO2LrgNFD_35lltCFqBpMuHltWH7cXl9-w","dp":"ysPNJveJcva6jItvhPi9v2b9AiV3eXw9j7mMyCx2zmT1JBg9Cw3LPJqrgHuRTT6mSBYcb2Y_F-ucHS4D2tSEv9czXIpgJCwILz5OsTlDTbvWLhTYiivDjEGRw9qTA5Ttd-uiljXjzxkNxnh8f1ezTUdkW3yD6qp-AbtzpemVx8bneOtJTKLidxT8bkfR4rlbndSVJsEtFppBln-WWevjvC8_YRyb9Yabc9ZRXioYrVqScEPJ3g4pqKT-FQ9ySlDEud5P9qFPbyNalsx9RQJzeMhplO0j-tO_0t1DzlbImqpxdaw_hOlaiZtUJk20EMrozj1kbLa1UNiwwXyUTiEMRw","dq":"mqoiuCdsAFgHCPTINNjBvzDBvLtG6HVGqTaoLh3aERV5yKCxLI9oLXZkBZSay4yM_cP-gB6IEfe26lPoxC5T-9HWlXu8Pf04Q9yeXBdWFoRfLEr-5jotbili7UXn1EsWUYfTImnpnJX0vIrayo9d8xg9zpULflc2OGjye7JHzW5LO4aGGMZ3_xnHj5pUz06vjy1jaSMhHQPvdWqYnruW00ND9VFNNNhPQGY1WwVZ3clhp_gciAEwQhdQqByyS3YeaPnstACHflyIlGZ7gEjx-WI7KzixpQloEanmDVNA_RsIeMHk8_Zg0JlRJzJKmWBZJPcDTOXgwqqAvPlLGE3WUQ","qi":"mir4yvSOVjuPze40YEfIKTSFFjKLjv1XRRQpnM6UDL6zTFLDOkowubBv47frISMLVasH_n_DDZvX6zP83iP1ctytuPkFW3zNGOXuWqH2C2ABisO6pqA260JH7M9nsh6dmD0OSb1Lr8zHH1Y-lNpi1IWOpbJ9kDfXd1Yn57vdEOMW9DnLCf8ldIdA9q-E-5xbueu6eaq1_fwlXo3Rvy7OXZhz3jKFHJ6DaY4EONAyxTPy-rz3UvCp_wO24E-HvvCu4JeKUBs7_8tzlpVD0FXxA1W_PcqVF-stQEHLF3dB8MGd8FuqFrk_db9ZjdfgHuYoiIzBU4mRzzX_CbqN4ZPV_A"};
    
    const imageUrl = "https://arweave.net/K3cl35GF4rKnkKll4_cw3Nwg24xGk0nna9-NNbfBq6w";
    let metadata:String = `{
        "name": "Witch Token",
        "symbol": "WIT",
        "description": "Metadata for the Witch Token ;)",
        "image": "${imageUrl}"
    }`;
    metadata = metadata.trim();
    
    const data = JSON.parse(JSON.stringify(metadata));    
    const transaction = await arweave.createTransaction({data: data});
    
    transaction.addTag('Content-Type', 'application/json');
    
    await arweave.transactions.sign(transaction, arJWT);
    const response = await arweave.transactions.post(transaction);
    console.log(response);

    const jsonFile = transaction.id ? `https://arweave.net/${transaction.id}` : undefined;
    console.log(jsonFile);

})();