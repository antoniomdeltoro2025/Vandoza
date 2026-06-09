import { useState, useMemo } from "react";

const LOGO_B64 = "/9j/4AAQSkZJRgABAgEASABIAAD/7QAsUGhvdG9zaG9wIDMuMAA4QklNA+0AAAAAABAASAAAAAEAAQBIAAAAAQAB/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAcAEAAwERAAIRAQMRAf/EAaIAAAAHAQEBAQEAAAAAAAAAAAQFAwIGAQAHCAkKCwEAAgIDAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAACAQMDAgQCBgcDBAIGAnMBAgMRBAAFIRIxQVEGE2EicYEUMpGhBxWxQiPBUtHhMxZi8CRygvElQzRTkqKyY3PCNUQnk6OzNhdUZHTD0uIIJoMJChgZhJRFRqS0VtNVKBry4/PE1OT0ZXWFlaW1xdXl9WZ2hpamtsbW5vY3R1dnd4eXp7fH1+f3OEhYaHiImKi4yNjo+Ck5SVlpeYmZqbnJ2en5KjpKWmp6ipqqusra6voRAAICAQIDBQUEBQYECAMDbQEAAhEDBCESMUEFURNhIgZxgZEyobHwFMHR4SNCFVJicvEzJDRDghaSUyWiY7LCB3PSNeJEgxdUkwgJChgZJjZFGidkdFU38qOzwygp0+PzhJSktMTU5PRldYWVpbXF1eX1RlZmdoaWprbG1ub2R1dnd4eXp7fH1+f3OEhYaHiImKi4yNjo+DlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+v/aAAwDAQACEQMRAD8A8qYq7FXYq7FXYq7FXYq7FXYq7FU88kf8pho3/MXD/wATGWYfrj7x97DL9B9x+56vnZPAOxV2KuxV2KuxV2KuxV2KuxVnH5J/+TO0b/o5/wCoSXMHtH+4l8PvDseyv8Yj8fuL6pzl3sXYq7FXYq7FXYq7FXYq7FXYq/KvFXYq7FXYq7FXYq7FXYq7FXYqnnkj/lMNG/5i4f8AiYyzD9cfePvYZfoPuP3PV87J4B2KuxV2KuxV2KuxV2KuxV2Ks4/JP/yZ2jf9HP8A1CS5g9o/3Evh94dj2V/jEfj9xfVOcu9i7FXYq7FXYq7FXYq7FXYq7FX5V4q7FXYq7FXYq7FXYq7FXYq7FU88kf8AKYaN/wAxcP8AxMZZh+uPvH3sMv0H3H7nq+dk8A7FXYq7FXYq7FXYq7FXYq7FWcfkn/5M7Rv+jn/qElzB7R/uJfD7w7Hsr/GI/H7i+qc5d7F2KuxV2KuxV2KuxV2KuxV2KvyrxV2KuxV2KuxVFy/8cm2/4zz/APEIcmfpHvP6GsfWfcP0oTINjsVdirsVTzyR/wApho3/ADFw/wDExlmH64+8fewy/Qfcfuer52TwDsVdirsVdiqfax/yi3l//o8/5PDMfH/eS+DmZ/7nH/nfekOZDhuxV2KuxVnH5J/+TO0b/o5/6hJcwe0f7iXw+8Ox7K/xiPx+4vqnOXexdirsVdirsVSvR/8Ajo65/wAxyf8AUFbZbk5R936S1w5y9/6AmmVNjsVdirsVflXirsVdiq+KKWWRY4kaSRtlRQWJPsBhAJ2CCQBZRX1CKHe9nWI/75jpLL9IBCr/ALJgfbJcNcyw4yeQRT30MOmW5tLdAvrzAmcLOxokVftLxFa9l+nLDMCIodT59zWIEyNnoOW3eh/q1ve/FZD07j9qzJry/wCMJO5/1Tv4VyHCJcufd+r8fNnxGP1cu/8AX+PkgSCDQ7EdRlba1irsVTzyR/ymGjf8xcP/ABMZZh+uPvH3sMv0H3H7nq+dk8A7FXYqitO0vUtTuVtdPtpbu4bpFChdqeJp0HuchOcYiyabMeKUzURZTr/DWkaZ8XmHVESYddM0/jdXNfB5Afq8f/BsR/LlPjSl9A+J2H63J/LQh/eS3/mx3P6gneo+arXT/L+h/onSbVLKX60rw3yJeyugkAZWldVK8+p9ML7ZRDAZTlxSN7ctvx8XLyaoQxQ4IjhPFz36/pSeby9p2tQve+V+XropkutBkbncRgCrNbt/u+Mf8GO4PXLhlMDWT/TdPj3fc40tPHKOLFz6x6/DvH2sYIIND1zKcB2KuxVnH5J/+TO0b/o5/wCoSXMHtH+4l8PvDseyv8Yj8fuL6pzl3sXYq7FUPfajYWEImvZ0t4yeKmRgOTHoqjqzHsBvkowMuQRKQHNL/wBKavfCml2Jhhbpe6gGiHzS32mb5P6fzyzgjH6j8B+vl97XxyPIfP8AVz+5LNM0Ce4vtZln1K5+vx3qencQuYo0f6nbmotwTEwoaUkDbfflk8oAjQFV+k9f1NcMdmVk3f6B0/XaZ22s3NrcJY60iwzyEJb30dRbXDHYAVJMUh/32x3/AGS29KzjBFx+XUNgmQal+xOMpbXYq7FX5V4q7FXYqm2nWF6treuwNvHJAAssp9NSDNHWldyKDtl0Imj7v0hoyTFjrv8AoKFMWmQ/bme6Yfswj00/4OQcv+EyFRHn+Px0Z3I9K/H46rLq7WaOOKOFIIYyzKqliSzhQSxYneiDptglKxSYwo3dog2Nm0NuEmMV1JGHKy0EbEsQAr/snb9rb3w8IIHf+Px+lHEQT3fj8foW6yk63SfWARMYYzIW6k8QKk9/njku91xkVtyQGQbHYqnnkj/lMNG/5i4f+JjLMP1x94+9hl+g+4/c9XzsngHYq2qszBVBZmNFUbkk4EgW9B0Lyvr1v5G11L1xocd5c6eRNfu1srxItzyBWhkYHkKAKeXatMwMuaByxr1UJct+522DTZBhnxeji4ee3ekCxeRtP3mnutdnG/C3AsravgZJA8zD/nmmX3ll3R+0/q+9xawQ5kzP+lH60Breu/pJLaCKzhsLKzDrbW0HqMAJG5MWeVpGZie9csx4uGzdktWfPxgAARjHkE/uPK+lGeyi0PUmtNfS0sro2t24hWSW4tYritrcgqqtyk2WTj7McxxmlR4hcLI28iRuHKOmgSPDlWSomjtdgH0lL/zCiuY/Nl0LpGjumjtnuAy8WMr20bSMw8S5JPvlmkIOMVy3+9q7QBGY35fcGOZkuE7FWcfkn/5M7Rv+jn/qElzB7R/uJfD7w7Hsr/GI/H7i+qc5d7F2KtO6Ihd2CooqzE0AA7knFWKjXtKuPNLzWEbatLHZrHG1mqyBSZX5gTsVhXtWrjMrwpCG/p36/q5uP4kTLbfbp+vkmn/O0XZ/49tLhI/yrqff/kVEjf8AIwZV6B3n7Px9jZ6z3D7fx9qM03TUsUm/fSXE1xJ60883Hm78FjqQiog+GNRRVGRnPiZRjSRWmt3E+iW8vmOxjk06/t0lku4VMluElQNxuIm5PGBWnL4k7kr0y6WMCR4DuD+KaRMmPqGxH4tNfK0xm8s6RKz+o0llbs0hPIsTEpJJ75VmFTl7y2YTcAfIJnlbY7FX5V4q7FXYqnk1td3F9rfpxSTMeYHFWYmlym23sMyTEmU63/tDjCQjGF7f9IlL/wBF3Q/vWih8RJLGrD/YV5/hlPAW7jComlx0R/rCTRutwQYuYo0EXqUPNV61HTJDH1vv+wMDlPKu77S5oBewwfV5UM8cYja3c8HJDMaqW+FuvStfbI8NjZlxcJN8lF7i8hiaynU8F6RSr8UZ/wAmvxL7064CSNikAE2ELkWbsVTzyR/ymGjf8xcP/ExlmH64+8fewy/Qfcfuer52TwDsVTXyl/ylWjf8x1t/yeXKc/8Ady9xb9L/AHsP6w+9lNjoXmHU/LHmcQWNzdTT6jYyIwjdi6xi75vyI3C8hU9sxZZYRnCyB6T/AL12AwZJwyUCSZR/3yRf4H1aI/6fc2GndNrm8gD7/wDFUbSS/wDC5kfmYnkCfcC4n5GY+oxj75BESeTbWCwuLv8ASMV/GLKa6gksxIqepBcRQlW9eONmH709B9OR/MEkCq3rf3E9Gz8kBEy4r9JO3kQOqrqGiHzI1teaHdQ3l2tlZW0+lFvSu1ktbSK3f00egmUmKo9Mk+2Rhk8OxMULO/Tck/BZ4PGo4yCeGI4eR2AHxSm/13Xf0edE1QeqtsQsIu463FtxNSkbsBIinulae2XRxQvij9nItGTPk4fDn07+YSfLnGdirOPyT/8AJnaN/wBHP/UJLmD2j/cS+H3h2PZX+MR+P3F9U5y72LsVSrzSAfL1+CKgxEEHpSoy3D9YYZPpKCn1vRbLzRKtze28B+pxoqPIisWEr/CFrUn2yYxyMNgebAziJbnojf8AElrJta2t5dN24W0san5STLFGf+CyHhHqQPiy8QdAfkpW/mCa4vobb6q9q31h7a5in4GQFbZbhSpieRNw47nCcVC7vb9NIjks8q/stD6TqiaNptlpusxtYtaQRwC8f4rST0lCchOPhTlTYScT4A5KcOMmUd7+fy/UiEuEAS2r5fj3ppZaRp9rdPd2QMK3AJlhiakDsxDer6f2Q/8AlLStd67ZVLISKLOMADYR2QZuxV+VeKuxV2KphBfyTrcpe3UjetEER5C8lGEqP7nopy3jJuzz/W1eGBXCOX6ipfVbP/lsX/gJP6ZXXmzs9yMtmt1jjgimErKl67kKygB7YAfaA/kOXQIqv633NUwbv+r96AigtmjDPcrGx6oVckfSBTKabiT3KmoTRyLaxpKZvQh9NnII39R2AHLegDDJTlYHkGMI1fmf0BB5Bm7FU88kf8pho3/MXD/xMZZh+uPvH3sMv0H3H7nq+dk8A7FV8E81vPHPA5jmiYPFIpoyspqpB8QcBAIopjIg2OYZZp/mH9K+XtX07X9clS5urizmtprw3FyCsAnEgqolI/vFzEni4ZxlCOwB5UO52GLPx45RyTO/DV2eVpb+gvL3/UyW3/SPef8AVLLPFn/MPzH62rwMX+qD/SyT+GbS18v3Wn2N6t81npV0ZpUjljUGW9t2UASqh6ZQRLjBIq5D7i5kZQ8MxieLhhLv6yj3sctdH0SSCOWXX7e3lZQzwtBdMyH+UlIipp7HMiWSV/SfmHBjhxkAmYB9xVvOep2t/qNqba6N6lrZW1s923qAySRJR2/egP8AaJ64NPAxBsVZJZa3KJyFHiqIF/2pBmQ4bsVZx+Sf/kztG/6Of+oSXMHtH+4l8PvDseyv8Yj8fuL6pzl3sXYqp3Ftb3MElvcxJPBKpSWGRQ6Mp6hlaoIOEEg2EEAiikx0+XTNWM+maYjWslssRjtzFCFZHZvsniOjZdxcUakd7a+HhOwRP6T1j/qzy/8AI6D/AJqyPBH+d97LiPcllvDeLrsNxdQG2a7vpZY4iyuQi2CRblCR9qI5YSOGh0H++YAHis9T+hNJNQ1WrJ+iJHTcV9aChHyLd8qEY/zvvZ8R7l3l2ylstIht5YhC4aVzCpBC+pKzhRx225dtscsrla440Exytm7FX5V4q7FXYq7FXYqr2k4glZyKgxyx0HjJGyA/RyyUZUWMo2FDIsnYq7FXYqnnkj/lMNG/5i4f+JjLMP1x94+9hl+g+4/c9XzsngHYq7FXYq7FUx0nU47GHUo3Qub60a1QinwsZY5OR9v3eVZIcRHkbb8OUQEr/ijX3JdlrQ7FXYq7FWcfkn/5M7Rv+jn/AKhJcwe0f7iXw+8Ox7K/xiPx+4vqnOXexdirsVdirsVQl3ZNPfWNwGAW1eRmU9TzjKbffk4yoEd7EjcIvIMnYq7FXYq/KvFXYqm+nT6Ui2nrxo0au7agsi1d1/ZWMjcDj4EHl1NKERLIUnOlP5UfSVi1FFfUzqETSXUMbenHZESMSVRR0k+2KV4FeO60CkI7Q7jy3an172O3bTLo26Mr2q3PApc2wkpMIecbNbevVK8tq1JKnAqSs2kS3VtfXvpIy27G/tBA1uZJG9QKY44k9FaVRfh4javUnCqK0q+0y1i1J9Rt7c2V7CRpp+qhj6iXEQASRkLKBCZOVH5dd+XE4q1puo+W4dDeG9SFtUku4zOwt1dXs1jmb00biDC7S8Fd0IIUrSvFhihJdal0iUxHT0Efo8oHoGHqrHQJcHlXi0tTyUdKYQg0lmFCeeSP+Uw0b/mLh/4mMsw/XH3j72GX6D7j9z1fOyeAdiqe2E+jrHbF1h9JIXW4SZeUjXLMTG9QCTGCErQ/ZDDq3xY8xLf8bObjljocqre+/wDVy+F9+5rpL+WHt7RdShjeaK6he9uoImKLEjMxDhF4FWT4Wp7HehrVPjs8Pds5OLwjEcQFgiyBt+OiMtm0SztRJLHbyJdNW3X6qlwoKhyAk3oKTybjVGHIUo3XIHiJ67edfZbdHwoiyB6uXpvv68P2c0rhTy9FrAv78RvaJEFu9PMTwyPLNbAc0jVeChZnJoGUDjtSq5aTMxoc+/4/qcURxCfFLkBuKrnHu9/3L7G4trSynj1GG0Z7tQdPmFmrBmYyfEHMYPFWKMQv7NBTquCQJI4b257ssZEYkTEbP0+n3+Xu+DcNz5XbTrGxneCG4dbhdUuFgEn7wIgtWSQDmoSpLcD8Tqa1BriROyRfSt/mxEsRiImgd+I17uHf9XM+9Idan025njubCIWyyLSS0FaRshKrQkb8kCkmv2q5fjEgKO7iaiUJG4ivL8eX2pflrQzj8k//ACZ2jf8ARz/1CS5g9o/3Evh94dj2V/jEfj9xfVOcu9i7FWAalp/m2S4NWv3uBqjzXb205igbSCx9OGBQ6KJPSEYfb1OYcq1CDgZBIblPzLh8xamtnezHSrk6f+iNKmngOoCD63LJdSJ60iEunAjjI1GhZQzco+OBOyTqvmjWNZilN3fWenWEkFvqq/pa6sW9H6xCTLNbPePPbM6NIm7Fm41UkEYp2ZMbvz/f6DoumwxXaXqPFdajqUVxbMk1gYyLi2imSQM1wnq+kj8RV1WQstahRsoXlpqeo+b7LWtFv9Sl8twtIutW0epSMwl9WiwpbidgjFnVijKGEfJRRuKhVQn0b81YtTurzTWvayXVvBpBub3nFb2MpuDI9xbO7xylKxciymUL0LEEF3XZ6P5XttXs9L+oapJJczWUkkEF9KyvJcW6msEshWn7z0yFkJUVcMaUIyQYlNsUPyrxV2KuxVmXk3zVZ6V5b1fS5NV1DRru9vtOvIb3TY+b+nZRXiSRtSe2I5Ndoy70+Hem2ApCc3/5g6BeX1zqMLXOn2dxaz2SeWYEraxPNyC3KsJI0rG7i7ACD9+oACrRgKZWiZ/zC8onUbp7m51bVbS8iTTazJF6sWlKJA9vymln5yyO6zeoONJFqAK0DS2FE+efJjRRNdC7uhHfW99a2wWQLCtrbyRx2jRS3Mlm0KSlPTPo8+HME78caK2GHectW0vWNabVLATiS8jSTUfrIXk15TjPKCpbl6zD1TsKMxFKAEkMSkWFDsVTzyR/ymGjf8xcP/ExlmH64+8fewy/Qfcfuer52TwDsVdirK/K/mKz0/SGtpNSvNPlS8W6K2icxPGqcTEx9SIbn+aozEz4TKV0DtW/R2Ol1EYQoyMTxXt18uabjzjoUk8txJf3tta3qW0I0q3QhbEQujNJA5kpULGwjK0b4zy7hqfy8wKoEi9+/wB/46OQNZjJvikBKhwj+Gq5b+W1d66486+WZhqUN9Jd6gNVNJp/SVQsUSAWkQEkjyUgccj8fxDrviNNMURQ4fwfmylrcJ4hK5cXl06Dn0VZPO/lb1vr7y3k14s8t3YKgb/RmdCkcZSWVrf/AEfnWNo4x9gVG9ABpslVtVUfP7L362eqnW4fqJkTZI8vmeHa9qHRhHmO50u71q6utLR4rO4b1UikABRnAZ0FC3wq5IX2zNwxkIgS5h1eplCUyYciluWtDsVZx+Sf/kztG/6Of+oSXMHtH+4l8PvDseyv8Yj8fuL6pzl3sXYq7FXknnj8tde1rzbrlzbaRptzHrVlZ21j5gupuF1pUtt63KeBBC8hkBkVk4SKOQHI0rQUyBY5e/lL52Ol21jZ+XtGF9o9vPbT6vNJHK2tNdFUM80ckL0dD/pR9fkPWVeNVrgpNqj/AJQfmS1zFcaP+jvLtrBpw0Kyskuriaa2sJoHiuG9SOOKOSU3E/1rlQMzRoCeuNLYUbn8o/zH1W0v9Jg0/SfL+h3n1b17NZYxV7JJhH6Utha20rw+rPHLF9Yd5FaLc/FTGlsPb/Lo10aFYLr/AKJ1pIEXUHtiWheZRR3Sqx0Dkcqcdq0yTBMcVdir8q8VdirsVdirsVdirsVdirsVdiqeeSP+Uw0b/mLh/wCJjLMP1x94+9hl+g+4/c9XzsngHYq7FXYq7FXYq7FXYq7FXYqzj8k//JnaN/0c/wDUJLmD2j/cS+H3h2PZX+MR+P3F9U5y72LsVdirsVdirsVdirsVdirsVflXirsVdirsVdirsVdirsVdirsVTzyR/wApho3/ADFw/wDExlmH64+8fewy/Qfcfuer52TwDsVdirsVdirsVdirsVdirsVZx+Sf/kztG/6Of+oSXMHtH+4l8PvDseyv8Yj8fuL6pzl3sXYq7FXYq7FXYq7FXYq7FXYq/LH6pdf75f8A4E/0wWmnfVLr/fL/APAn+mNrTvql1/vl/wDgT/TG1p31S6/3y/8AwJ/pja076pdf75f/AIE/0xtad9Uuv98v/wACf6Y2tO+qXX++X/4E/wBMbWnfVLr/AHy//An+mNrTvql1/vl/+BP9MbWnfVLr/fL/APAn+mNrSd+R7S7/AMYaN+5k/wB64v2T/MPbLMJ9cfePva8o9B9xetfo+/8A+WaX/gG/pnYcY73hPBn3H5O/R9//AMs0v/AN/THjHevgz7j8nfo+/wD+WaX/AIBv6Y8Y718Gfcfk79H3/wDyzS/8A39MeMd6+DPuPyd+j7//AJZpf+Ab+mPGO9fBn3H5O/R9/wD8s0v/AADf0x4x3r4M+4/J36Pv/wDlml/4Bv6Y8Y718Gfcfk79H3//ACzS/wDAN/THjHevgz7j8nfo+/8A+WaX/gG/pjxjvXwZ9x+Tv0ff/wDLNL/wDf0x4x3r4M+4/Jm35LWd3H+ZejvJBIiD6zVmRgB/oso6kZh9oSBwy37vvDsOy8chqIkg9fuL6jzmHrnYq7FXYq7FXYq7FXYq7FXYq//Z";

const CATEGORIAS = [
  { id: "mano_obra",    label: "Mano de Obra",  icon: "👷", color: "#E67E22" },
  { id: "materiales",   label: "Materiales",    icon: "🧱", color: "#2980B9" },
  { id: "fianzas",      label: "Fianzas",       icon: "📋", color: "#8E44AD" },
  { id: "estimaciones", label: "Estimaciones",  icon: "📐", color: "#27AE60" },
  { id: "laboratorio",  label: "Laboratorio",   icon: "🔬", color: "#E74C3C" },
  { id: "otros",        label: "Otros Gastos",  icon: "📦", color: "#7F8C8D" },
];
const CAT_MAP = Object.fromEntries(CATEGORIAS.map(c => [c.id, c]));
const fmt = n => Number(n).toLocaleString("es-MX", { style: "currency", currency: "MXN" });
const today = () => new Date().toISOString().split("T")[0];
let _id = Date.now();
const uid = () => String(++_id);

export default function App() {
  const [obras, setObras] = useState([]);
  const [obraActiva, setObraActiva] = useState(null);
  const [vista, setVista] = useState("obras");
  const [modalGasto, setModalGasto] = useState(null);
  const [modalObra, setModalObra] = useState(false);
  const [modalPago, setModalPago] = useState(null);
  const [filtro, setFiltro] = useState("todas");

  const obraById = id => obras.find(o => o.id === id);

  const totalesObra = obra => {
    const gastado   = obra.gastos.reduce((s, g) => s + g.pagos.reduce((p, x) => p + x.monto, 0), 0);
    const comprometido = obra.gastos.reduce((s, g) => s + g.montoTotal, 0);
    const pendientePago = comprometido - gastado;
    const saldoLibre = Math.max(0, (obra.montoObra || 0) - comprometido);
    const sobreejercido = Math.max(0, comprometido - (obra.montoObra || 0));
    return { gastado, comprometido, pendientePago, saldoLibre, sobreejercido };
  };

  const avanceObra = obra => {
    if (!obra.montoObra) return 0;
    return Math.min(100, (totalesObra(obra).gastado / obra.montoObra) * 100);
  };

  const crearObra = data => {
    setObras(p => [...p, { id: uid(), gastos: [], fechaInicio: today(), estado: "activa", ...data }]);
    setModalObra(false);
  };

  const agregarGasto = (obraId, data) => {
    setObras(p => p.map(o => o.id === obraId
      ? { ...o, gastos: [...o.gastos, { id: uid(), pagos: [], fechaRegistro: today(), ...data }] }
      : o));
    setModalGasto(null);
  };

  const agregarPago = (obraId, gastoId, pago) => {
    setObras(p => p.map(o => o.id === obraId
      ? { ...o, gastos: o.gastos.map(g => g.id === gastoId
          ? { ...g, pagos: [...g.pagos, { id: uid(), fecha: today(), ...pago }] }
          : g) }
      : o));
    setModalPago(null);
  };

  const eliminarGasto = (obraId, gastoId) =>
    setObras(p => p.map(o => o.id === obraId
      ? { ...o, gastos: o.gastos.filter(g => g.id !== gastoId) } : o));

  const cambiarEstado = (obraId, estado) =>
    setObras(p => p.map(o => o.id === obraId ? { ...o, estado } : o));

  const obra = obraActiva ? obraById(obraActiva) : null;

  return (
    <div style={S.root}>
      <Header
        vista={vista} obra={obra}
        onBack={() => { setVista("obras"); setObraActiva(null); }}
        onNuevaObra={() => setModalObra(true)}
      />
      {vista === "obras" && (
        <VistaObras obras={obras} filtro={filtro} setFiltro={setFiltro}
          totalesObra={totalesObra} avanceObra={avanceObra}
          onSelect={id => { setObraActiva(id); setVista("detalle"); }}
          onNueva={() => setModalObra(true)} />
      )}
      {vista === "detalle" && obra && (
        <VistaDetalle obra={obra} totales={totalesObra(obra)} avance={avanceObra(obra)}
          onAgregarGasto={() => setModalGasto({ obraId: obra.id })}
          onAgregarPago={gastoId => setModalPago({ obraId: obra.id, gastoId })}
          onEliminarGasto={gastoId => eliminarGasto(obra.id, gastoId)}
          onCambiarEstado={est => cambiarEstado(obra.id, est)} />
      )}
      {modalObra  && <ModalObra  onGuardar={crearObra} onCerrar={() => setModalObra(false)} />}
      {modalGasto && <ModalGasto onGuardar={d => agregarGasto(modalGasto.obraId, d)} onCerrar={() => setModalGasto(null)} />}
      {modalPago  && obra && (
        <ModalPago
          gasto={obra.gastos.find(g => g.id === modalPago.gastoId)}
          montoObra={obra.montoObra}
          onGuardar={pago => agregarPago(modalPago.obraId, modalPago.gastoId, pago)}
          onCerrar={() => setModalPago(null)} />
      )}
    </div>
  );
}

/* ─── HEADER ─────────────────────────────────────────────────────────────── */
function Header({ vista, obra, onBack, onNuevaObra }) {
  return (
    <header style={S.header}>
      <div style={S.headerLeft}>
        {vista === "detalle" && (
          <button style={S.backBtn} onClick={onBack}>← Obras</button>
        )}
        <img src={`data:image/jpeg;base64,${LOGO_B64}`} alt="Constructora Dozaga"
          style={{ height: 44, objectFit: "contain" }} />
        {vista === "detalle" && obra && (
          <div style={S.obraTitle}>{obra.nombre}</div>
        )}
      </div>
      {vista === "obras" && (
        <button style={S.btnPrimary} onClick={onNuevaObra}>+ Nueva Obra</button>
      )}
    </header>
  );
}

/* ─── VISTA OBRAS ────────────────────────────────────────────────────────── */
function VistaObras({ obras, filtro, setFiltro, totalesObra, avanceObra, onSelect, onNueva }) {
  const filtradas = obras.filter(o => filtro === "todas" || o.estado === filtro);
  return (
    <div style={S.page}>
      <div style={S.filtroRow}>
        {["todas","activa","pausada","terminada"].map(f => (
          <button key={f} style={{ ...S.filtroBtn, ...(filtro===f ? S.filtroBtnActive : {}) }}
            onClick={() => setFiltro(f)}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>
      {filtradas.length === 0 ? (
        <div style={S.empty}>
          <div style={{ fontSize: 52 }}>🏗️</div>
          <div style={S.emptyTitle}>Sin obras registradas</div>
          <div style={S.emptyText}>Agrega tu primera obra para comenzar</div>
          <button style={S.btnPrimary} onClick={onNueva}>+ Agregar Obra</button>
        </div>
      ) : (
        <div style={S.grid}>
          {filtradas.map(obra => {
            const { gastado, comprometido, saldoLibre, sobreejercido } = totalesObra(obra);
            const avance = avanceObra(obra);
            const pctComp = obra.montoObra ? Math.min(100, comprometido / obra.montoObra * 100) : 0;
            return (
              <div key={obra.id} style={S.obraCard} onClick={() => onSelect(obra.id)}>
                <div style={S.obraCardTop}>
                  <div>
                    <div style={S.obraCardNombre}>{obra.nombre}</div>
                    <div style={S.obraCardLoc}>{obra.ubicacion || "Sin ubicación"}</div>
                  </div>
                  <span style={{ ...S.estadoBadge, ...estadoColor(obra.estado) }}>{obra.estado}</span>
                </div>

                <div style={S.obraCardMonto}>
                  <span style={S.obraCardMontoLabel}>Monto de obra</span>
                  <span style={S.obraCardMontoVal}>{fmt(obra.montoObra || 0)}</span>
                </div>

                {/* barra doble: ejercido + comprometido */}
                <div style={S.progressBar}>
                  <div style={{ ...S.progressFillComp, width: `${pctComp}%` }} />
                  <div style={{ ...S.progressFillEjerc, width: `${avance}%` }} />
                </div>
                <div style={S.progressLabel}>
                  <span>Ejercido: {fmt(gastado)}</span>
                  <span style={{ color: avance >= 90 ? "#E74C3C" : "#90A4AE" }}>{avance.toFixed(1)}%</span>
                </div>

                <div style={S.saldoRow}>
                  {sobreejercido > 0
                    ? <span style={S.sobreTag}>⚠️ Sobreejercido: {fmt(sobreejercido)}</span>
                    : <span style={S.saldoTag}>✅ Saldo libre: {fmt(saldoLibre)}</span>}
                </div>

                <div style={S.obraCardStats}>
                  <Stat label="Gastos"    val={obra.gastos.length} />
                  <Stat label="Comprometido" val={fmt(comprometido)} />
                  <Stat label="Por pagar" val={fmt(comprometido - gastado)} warn />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── VISTA DETALLE ──────────────────────────────────────────────────────── */
function VistaDetalle({ obra, totales, avance, onAgregarGasto, onAgregarPago, onEliminarGasto, onCambiarEstado }) {
  const [catFiltro, setCatFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");

  const gastosFiltrados = obra.gastos.filter(g => {
    const matchCat  = catFiltro === "todas" || g.categoria === catFiltro;
    const matchBusq = g.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                      (g.proveedor||"").toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchBusq;
  });

  const porCategoria = useMemo(() =>
    CATEGORIAS.map(cat => {
      const gs = obra.gastos.filter(g => g.categoria === cat.id);
      const pagado = gs.reduce((s,g) => s + g.pagos.reduce((p,x)=>p+x.monto,0), 0);
      const total  = gs.reduce((s,g) => s + g.montoTotal, 0);
      return { ...cat, pagado, total, count: gs.length };
    }).filter(c => c.count > 0),
  [obra.gastos]);

  const pctComp = obra.montoObra ? Math.min(100, totales.comprometido / obra.montoObra * 100) : 0;

  return (
    <div style={S.page}>

      {/* ── Termómetro presupuestal ── */}
      <div style={S.termometro}>
        <div style={S.termRow}>
          <div style={S.termLabel}>💰 Monto de Obra</div>
          <div style={S.termVal}>{fmt(obra.montoObra || 0)}</div>
        </div>
        <div style={{ position: "relative", margin: "10px 0 4px" }}>
          {/* fondo gris */}
          <div style={S.barBg} />
          {/* comprometido (azul claro) */}
          <div style={{ ...S.barComp, width: `${pctComp}%` }} />
          {/* ejercido (naranja) */}
          <div style={{ ...S.barEjerc, width: `${avance}%` }} />
        </div>
        <div style={S.termLeyenda}>
          <span><span style={{ color:"#E67E22",fontWeight:700 }}>■</span> Ejercido {avance.toFixed(1)}%</span>
          <span><span style={{ color:"#5DADE2",fontWeight:700 }}>■</span> Comprometido {pctComp.toFixed(1)}%</span>
        </div>

        <div style={S.termGrid}>
          <TermCard label="Total Ejercido"    val={fmt(totales.gastado)}       icon="✅" color="#27AE60" />
          <TermCard label="Comprometido"      val={fmt(totales.comprometido)}  icon="📌" color="#2980B9" />
          <TermCard label="Por Pagar"         val={fmt(totales.pendientePago)} icon="⏳" color="#E67E22" />
          {totales.sobreejercido > 0
            ? <TermCard label="Sobreejercido" val={fmt(totales.sobreejercido)} icon="⚠️" color="#E74C3C" />
            : <TermCard label="Saldo Libre"   val={fmt(totales.saldoLibre)}    icon="🟢" color="#1E8449" />}
        </div>

        <div style={S.termEstados}>
          {["activa","pausada","terminada"].map(e => (
            <button key={e}
              style={{ ...S.estadoBtn, ...(obra.estado===e ? estadoColor(e) : { background:"#eee", color:"#555" }) }}
              onClick={() => onCambiarEstado(e)}>{e}</button>
          ))}
          <span style={{ color:"#aaa", fontSize:12, marginLeft:4 }}>
            {obra.fechaInicio} — {obra.fechaFin || "En curso"}
          </span>
        </div>
      </div>

      {/* ── Desglose categorías ── */}
      {porCategoria.length > 0 && (
        <div style={S.catSection}>
          <div style={S.sectionTitle}>Desglose por categoría</div>
          <div style={S.catGrid}>
            {porCategoria.map(cat => {
              const pctCat = obra.montoObra ? (cat.total / obra.montoObra * 100).toFixed(1) : 0;
              return (
                <div key={cat.id} style={{ ...S.catCard, ...(catFiltro===cat.id ? { border:`2px solid ${cat.color}` } : {}) }}
                  onClick={() => setCatFiltro(catFiltro===cat.id ? "todas" : cat.id)}>
                  <div style={{ fontSize:22 }}>{cat.icon}</div>
                  <div style={S.catCardLabel}>{cat.label}</div>
                  <div style={{ ...S.catCardMonto, color:cat.color }}>{fmt(cat.pagado)}</div>
                  {cat.total > cat.pagado && <div style={S.catCardPend}>Pend: {fmt(cat.total-cat.pagado)}</div>}
                  <div style={S.catCardPct}>{pctCat}% de obra</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Lista gastos ── */}
      <div style={S.gastosSection}>
        <div style={S.gastosSectionHeader}>
          <div style={S.sectionTitle}>Gastos ({obra.gastos.length})</div>
          <button style={S.btnPrimary} onClick={onAgregarGasto}>+ Agregar Gasto</button>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
          <input placeholder="Buscar gasto o proveedor…" style={S.searchInput}
            value={busqueda} onChange={e => setBusqueda(e.target.value)} />
          <button style={{ ...S.filtroBtn, ...(catFiltro==="todas" ? S.filtroBtnActive : {}) }}
            onClick={() => setCatFiltro("todas")}>Todas</button>
          {CATEGORIAS.map(cat => (
            <button key={cat.id}
              style={{ ...S.filtroBtn, ...(catFiltro===cat.id
                ? { ...S.filtroBtnActive, background:cat.color, borderColor:cat.color }
                : {}) }}
              onClick={() => setCatFiltro(catFiltro===cat.id ? "todas" : cat.id)}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
        {gastosFiltrados.length === 0
          ? <div style={S.emptySmall}>Sin gastos en esta categoría</div>
          : <div style={S.gastosList}>
              {gastosFiltrados.map(g => (
                <GastoRow key={g.id} gasto={g} montoObra={obra.montoObra}
                  onAgregarPago={() => onAgregarPago(g.id)}
                  onEliminar={() => onEliminarGasto(g.id)} />
              ))}
            </div>
        }
      </div>
    </div>
  );
}

/* ─── GASTO ROW ──────────────────────────────────────────────────────────── */
function GastoRow({ gasto, montoObra, onAgregarPago, onEliminar }) {
  const [open, setOpen] = useState(false);
  const cat      = CAT_MAP[gasto.categoria];
  const pagado   = gasto.pagos.reduce((s,p) => s + p.monto, 0);
  const pendiente = Math.max(0, gasto.montoTotal - pagado);
  const pct      = gasto.montoTotal > 0 ? Math.min(100, pagado / gasto.montoTotal * 100) : 0;
  const pctObra  = montoObra ? (gasto.montoTotal / montoObra * 100).toFixed(1) : null;
  const esParcial = gasto.tipoPago === "parcial";
  const totalPagado = pendiente === 0;

  return (
    <div style={S.gastoCard}>
      <div style={S.gastoCardHeader} onClick={() => setOpen(!open)}>
        <div style={S.gastoCardLeft}>
          <span style={{ fontSize:20 }}>{cat?.icon}</span>
          <div>
            <div style={S.gastoDesc}>{gasto.descripcion}</div>
            {gasto.proveedor && <div style={S.gastoProv}>Proveedor: {gasto.proveedor}</div>}
            <div style={{ display:"flex", gap:6, marginTop:2 }}>
              <span style={S.gastoFecha}>{gasto.fecha}</span>
              <span style={{ ...S.tipoBadge, background: esParcial ? "#FEF3E2" : "#E8F8F5",
                color: esParcial ? "#E67E22" : "#27AE60" }}>
                {esParcial ? "Parcial" : "Total"}
              </span>
            </div>
          </div>
        </div>
        <div style={S.gastoCardRight}>
          <div style={{ ...S.catPill, background:cat?.color+"20", color:cat?.color }}>{cat?.label}</div>
          <div style={S.gastoMontoBig}>{fmt(gasto.montoTotal)}</div>
          {pctObra && <div style={S.pctObraTag}>{pctObra}% de obra</div>}
          {totalPagado
            ? <div style={S.gastoPagadoBadge}>✓ Pagado</div>
            : <div style={S.gastoPendBadge}>Pend: {fmt(pendiente)}</div>}
          <span style={{ color:"#aaa", fontSize:11 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* barra de avance de pago */}
      <div style={S.gastoProgress}>
        <div style={{ ...S.gastoProgressFill, width:`${pct}%`, background:cat?.color }} />
      </div>
      <div style={S.gastoProgressLabel}>
        <span>Pagado: {fmt(pagado)} / {fmt(gasto.montoTotal)}</span>
        <span>{pct.toFixed(0)}%</span>
      </div>

      {open && (
        <div style={S.pagosSection}>
          <div style={S.pagosTitulo}>
            {esParcial ? `Pagos parciales (${gasto.pagos.length})` : "Pago único"}
          </div>
          {gasto.pagos.length === 0 && <div style={S.emptySmall}>Sin pagos registrados</div>}
          {gasto.pagos.map((pago, i) => (
            <div key={pago.id} style={S.pagoRow}>
              <span style={S.pagoNum}>#{i+1}</span>
              <span style={S.pagoFecha}>{pago.fecha}</span>
              <span style={S.pagoConcepto}>{pago.concepto || (esParcial ? "Pago parcial" : "Pago total")}</span>
              <span style={S.pagoMonto}>{fmt(pago.monto)}</span>
            </div>
          ))}
          <div style={S.pagosActions}>
            {pendiente > 0 && (
              <button style={S.btnSecondary} onClick={onAgregarPago}>
                + {esParcial ? "Registrar Pago" : "Marcar como Pagado"}
              </button>
            )}
            <button style={S.btnDanger} onClick={onEliminar}>Eliminar</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── MODAL OBRA ─────────────────────────────────────────────────────────── */
function ModalObra({ onGuardar, onCerrar }) {
  const [form, setForm] = useState({ nombre:"", ubicacion:"", montoObra:"", fechaInicio:today(), fechaFin:"", notas:"" });
  const set = (k,v) => setForm(p => ({ ...p, [k]:v }));
  const guardar = () => {
    if (!form.nombre || !form.montoObra) return alert("Nombre y monto son requeridos");
    onGuardar({ ...form, montoObra: parseFloat(form.montoObra) });
  };
  return (
    <Modal titulo="Nueva Obra" onCerrar={onCerrar}>
      <Label>Nombre de la Obra *</Label>
      <Input placeholder="Ej: Edificio Residencial Norte" value={form.nombre} onChange={e=>set("nombre",e.target.value)} />
      <Label>Ubicación</Label>
      <Input placeholder="Ej: Av. Insurgentes 123, CDMX" value={form.ubicacion} onChange={e=>set("ubicacion",e.target.value)} />
      <Label>Monto de Obra (MXN) *</Label>
      <Input type="number" placeholder="0.00" value={form.montoObra} onChange={e=>set("montoObra",e.target.value)} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <div><Label>Fecha Inicio</Label><Input type="date" value={form.fechaInicio} onChange={e=>set("fechaInicio",e.target.value)} /></div>
        <div><Label>Fecha Estimada Fin</Label><Input type="date" value={form.fechaFin} onChange={e=>set("fechaFin",e.target.value)} /></div>
      </div>
      <Label>Notas</Label>
      <Textarea placeholder="Cliente, descripción…" value={form.notas} onChange={e=>set("notas",e.target.value)} />
      <div style={S.modalActions}>
        <button style={S.btnGhost} onClick={onCerrar}>Cancelar</button>
        <button style={S.btnPrimary} onClick={guardar}>Crear Obra</button>
      </div>
    </Modal>
  );
}

/* ─── MODAL GASTO ────────────────────────────────────────────────────────── */
function ModalGasto({ onGuardar, onCerrar }) {
  const [form, setForm] = useState({
    descripcion:"", categoria:"materiales", montoTotal:"",
    proveedor:"", fecha:today(), notas:"", tipoPago:"parcial"
  });
  const set = (k,v) => setForm(p => ({ ...p, [k]:v }));
  const guardar = () => {
    if (!form.descripcion || !form.montoTotal) return alert("Descripción y monto son requeridos");
    onGuardar({ ...form, montoTotal: parseFloat(form.montoTotal) });
  };
  return (
    <Modal titulo="Registrar Gasto" onCerrar={onCerrar}>
      <Label>Descripción *</Label>
      <Input placeholder="Ej: Cemento gris – 200 sacos" value={form.descripcion} onChange={e=>set("descripcion",e.target.value)} />

      <Label>Tipo de Pago *</Label>
      <div style={S.tipoRow}>
        {[
          { val:"total",   icon:"💳", txt:"Pago Total",    sub:"Se paga de una sola vez" },
          { val:"parcial", icon:"📅", txt:"Pago Parcial",  sub:"Se pagará en abonos" },
        ].map(op => (
          <div key={op.val}
            style={{ ...S.tipoCard, ...(form.tipoPago===op.val ? S.tipoCardActive : {}) }}
            onClick={() => set("tipoPago", op.val)}>
            <span style={{ fontSize:22 }}>{op.icon}</span>
            <div style={S.tipoCardTxt}>{op.txt}</div>
            <div style={S.tipoCardSub}>{op.sub}</div>
          </div>
        ))}
      </div>

      <Label>Categoría *</Label>
      <select style={S.select} value={form.categoria} onChange={e=>set("categoria",e.target.value)}>
        {CATEGORIAS.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
      </select>

      <Label>Monto Total (MXN) *</Label>
      <Input type="number" placeholder="0.00" value={form.montoTotal} onChange={e=>set("montoTotal",e.target.value)} />

      <Label>Proveedor / Contratista</Label>
      <Input placeholder="Nombre del proveedor" value={form.proveedor} onChange={e=>set("proveedor",e.target.value)} />

      <Label>Fecha</Label>
      <Input type="date" value={form.fecha} onChange={e=>set("fecha",e.target.value)} />

      <Label>Notas</Label>
      <Textarea placeholder="Detalles adicionales…" value={form.notas} onChange={e=>set("notas",e.target.value)} />

      <div style={S.modalActions}>
        <button style={S.btnGhost} onClick={onCerrar}>Cancelar</button>
        <button style={S.btnPrimary} onClick={guardar}>Registrar Gasto</button>
      </div>
    </Modal>
  );
}

/* ─── MODAL PAGO ─────────────────────────────────────────────────────────── */
function ModalPago({ gasto, montoObra, onGuardar, onCerrar }) {
  const pagado    = gasto.pagos.reduce((s,p) => s+p.monto, 0);
  const pendiente = gasto.montoTotal - pagado;
  const esParcial = gasto.tipoPago === "parcial";
  const pctObra   = montoObra ? (gasto.montoTotal / montoObra * 100).toFixed(1) : null;
  const [form, setForm] = useState({
    monto: esParcial ? "" : String(pendiente),
    concepto: esParcial ? "Pago parcial" : "Pago total",
    fecha: today()
  });
  const set = (k,v) => setForm(p => ({ ...p, [k]:v }));

  const guardar = () => {
    const monto = parseFloat(form.monto);
    if (!monto || monto <= 0) return alert("Ingresa un monto válido");
    if (monto > pendiente + 0.01) return alert(`Supera el pendiente de ${fmt(pendiente)}`);
    onGuardar({ ...form, monto });
  };

  return (
    <Modal titulo={esParcial ? "Registrar Pago Parcial" : "Registrar Pago"} onCerrar={onCerrar}>
      <div style={S.pagoInfo}>
        <div><span style={S.pagoInfoLabel}>Gasto:</span> {gasto.descripcion}</div>
        <div><span style={S.pagoInfoLabel}>Monto total:</span> {fmt(gasto.montoTotal)}
          {pctObra && <span style={{ color:"#2980B9", marginLeft:6 }}>({pctObra}% de la obra)</span>}</div>
        <div><span style={S.pagoInfoLabel}>Ya pagado:</span> {fmt(pagado)}</div>
        <div style={{ color:"#E67E22", fontWeight:700 }}><span style={S.pagoInfoLabel}>Pendiente:</span> {fmt(pendiente)}</div>
      </div>
      <Label>Monto a Pagar (MXN) *</Label>
      <Input type="number" placeholder="0.00" value={form.monto} onChange={e=>set("monto",e.target.value)} />
      <Label>Concepto</Label>
      <Input placeholder="Ej: 1ª estimación, anticipo, finiquito…" value={form.concepto} onChange={e=>set("concepto",e.target.value)} />
      <Label>Fecha de Pago</Label>
      <Input type="date" value={form.fecha} onChange={e=>set("fecha",e.target.value)} />
      <div style={S.modalActions}>
        <button style={S.btnGhost} onClick={onCerrar}>Cancelar</button>
        <button style={S.btnPrimary} onClick={guardar}>Registrar Pago</button>
      </div>
    </Modal>
  );
}

/* ─── MICRO COMPONENTES ──────────────────────────────────────────────────── */
const Modal = ({ titulo, onCerrar, children }) => (
  <div style={S.overlay}>
    <div style={S.modal}>
      <div style={S.modalHeader}>
        <div style={S.modalTitulo}>{titulo}</div>
        <button style={S.closeBtn} onClick={onCerrar}>✕</button>
      </div>
      <div style={S.modalBody}>{children}</div>
    </div>
  </div>
);
const Label    = ({ children }) => <div style={S.label}>{children}</div>;
const Input    = props => <input style={S.input} {...props} />;
const Textarea = props => <textarea style={S.textarea} rows={3} {...props} />;

const TermCard = ({ label, val, icon, color }) => (
  <div style={{ ...S.termCard, borderLeft:`4px solid ${color}` }}>
    <div style={{ fontSize:18 }}>{icon}</div>
    <div style={{ ...S.termCardVal, color }}>{val}</div>
    <div style={S.termCardLabel}>{label}</div>
  </div>
);

const Stat = ({ label, val, warn }) => (
  <div style={S.stat}>
    <div style={{ ...S.statVal, color: warn ? "#E67E22" : "#1A3C5E" }}>{val}</div>
    <div style={S.statLabel}>{label}</div>
  </div>
);

const estadoColor = e => ({
  activa:    { background:"#D5F5E3", color:"#1E8449" },
  pausada:   { background:"#FDEBD0", color:"#D35400" },
  terminada: { background:"#D6EAF8", color:"#1A5276" },
}[e] || {});

/* ─── ESTILOS ────────────────────────────────────────────────────────────── */
const S = {
  root:  { fontFamily:"'Inter','Segoe UI',system-ui,sans-serif", background:"#F0F4F8", minHeight:"100vh" },
  header:{ background:"#0D2137", padding:"10px 20px", display:"flex", alignItems:"center",
           justifyContent:"space-between", boxShadow:"0 2px 10px rgba(0,0,0,0.4)" },
  headerLeft: { display:"flex", alignItems:"center", gap:12 },
  obraTitle:  { color:"#fff", fontWeight:700, fontSize:15 },
  backBtn:    { background:"rgba(255,255,255,0.15)", border:"none", color:"#fff",
                padding:"6px 12px", borderRadius:6, cursor:"pointer", fontSize:13 },
  page: { maxWidth:920, margin:"0 auto", padding:"20px 16px" },

  /* Botones */
  btnPrimary:   { background:"#E67E22", color:"#fff", border:"none", borderRadius:8,
                  padding:"10px 18px", fontWeight:600, cursor:"pointer", fontSize:14 },
  btnSecondary: { background:"#1A3C5E", color:"#fff", border:"none", borderRadius:6,
                  padding:"7px 14px", fontWeight:600, cursor:"pointer", fontSize:13 },
  btnDanger:    { background:"transparent", color:"#E74C3C", border:"1px solid #E74C3C",
                  borderRadius:6, padding:"7px 14px", cursor:"pointer", fontSize:13 },
  btnGhost:     { background:"transparent", color:"#555", border:"1px solid #ccc",
                  borderRadius:8, padding:"10px 16px", cursor:"pointer", fontSize:14 },
  estadoBtn:    { border:"none", borderRadius:5, padding:"4px 10px", cursor:"pointer",
                  fontSize:12, fontWeight:600 },

  /* Filtros */
  filtroRow:      { display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" },
  filtroBtn:      { background:"#fff", border:"1px solid #ddd", borderRadius:20,
                    padding:"5px 14px", cursor:"pointer", fontSize:13, color:"#555" },
  filtroBtnActive:{ background:"#1A3C5E", borderColor:"#1A3C5E", color:"#fff" },

  /* Obra cards */
  grid:           { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:16 },
  obraCard:       { background:"#fff", borderRadius:12, padding:18, cursor:"pointer",
                    boxShadow:"0 1px 4px rgba(0,0,0,0.08)", border:"1px solid #E8EDF2" },
  obraCardTop:    { display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 },
  obraCardNombre: { fontWeight:700, fontSize:15, color:"#1A3C5E" },
  obraCardLoc:    { fontSize:12, color:"#90A4AE", marginTop:2 },
  estadoBadge:    { fontSize:11, fontWeight:600, borderRadius:10, padding:"3px 9px" },
  obraCardMonto:  { display:"flex", justifyContent:"space-between", marginBottom:8 },
  obraCardMontoLabel: { fontSize:12, color:"#90A4AE" },
  obraCardMontoVal:   { fontSize:14, fontWeight:700, color:"#1A3C5E" },
  progressBar:    { background:"#EEF2F7", borderRadius:4, height:10, marginBottom:4,
                    position:"relative", overflow:"hidden" },
  progressFillComp: { position:"absolute", top:0, left:0, height:"100%", borderRadius:4,
                      background:"#5DADE2", transition:"width .5s" },
  progressFillEjerc:{ position:"absolute", top:0, left:0, height:"100%", borderRadius:4,
                      background:"linear-gradient(90deg,#1A3C5E,#E67E22)", transition:"width .5s" },
  progressLabel:  { display:"flex", justifyContent:"space-between", fontSize:11, color:"#90A4AE", marginBottom:6 },
  saldoRow:       { marginBottom:10 },
  saldoTag:       { fontSize:12, color:"#1E8449", fontWeight:600 },
  sobreTag:       { fontSize:12, color:"#E74C3C", fontWeight:600 },
  obraCardStats:  { display:"flex", justifyContent:"space-between", paddingTop:12,
                    borderTop:"1px solid #F0F4F8" },
  stat:     { textAlign:"center" },
  statVal:  { fontWeight:700, fontSize:13 },
  statLabel:{ fontSize:10, color:"#90A4AE" },

  /* Empty */
  empty:      { textAlign:"center", padding:"60px 20px", display:"flex", flexDirection:"column",
                alignItems:"center", gap:12 },
  emptyTitle: { fontSize:18, fontWeight:700, color:"#1A3C5E" },
  emptyText:  { color:"#90A4AE", fontSize:14 },
  emptySmall: { color:"#aaa", fontSize:13, textAlign:"center", padding:"16px 0" },

  /* Termómetro */
  termometro: { background:"#fff", borderRadius:12, padding:18, marginBottom:16,
                boxShadow:"0 1px 4px rgba(0,0,0,0.08)" },
  termRow:    { display:"flex", justifyContent:"space-between", alignItems:"center" },
  termLabel:  { fontWeight:700, fontSize:14, color:"#1A3C5E" },
  termVal:    { fontWeight:800, fontSize:20, color:"#1A3C5E" },
  barBg:      { position:"absolute", top:0, left:0, width:"100%", height:14,
                borderRadius:7, background:"#EEF2F7" },
  barComp:    { position:"absolute", top:0, left:0, height:14, borderRadius:7,
                background:"#5DADE2", transition:"width .5s" },
  barEjerc:   { position:"absolute", top:0, left:0, height:14, borderRadius:7,
                background:"linear-gradient(90deg,#1A3C5E,#E67E22)", transition:"width .5s" },
  termLeyenda:{ display:"flex", gap:16, fontSize:12, color:"#555", margin:"8px 0 12px" },
  termGrid:   { display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10, marginBottom:14 },
  termCard:   { background:"#F8FAFC", borderRadius:8, padding:"12px 14px" },
  termCardVal:{ fontWeight:800, fontSize:17 },
  termCardLabel:{ fontSize:11, color:"#90A4AE", marginTop:2 },
  termEstados:{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" },

  /* Categorías */
  catSection: { background:"#fff", borderRadius:12, padding:16, marginBottom:16,
                boxShadow:"0 1px 4px rgba(0,0,0,0.08)" },
  sectionTitle:{ fontWeight:700, fontSize:15, color:"#1A3C5E", marginBottom:12 },
  catGrid:    { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:10 },
  catCard:    { background:"#F8FAFC", borderRadius:8, padding:"12px 10px", textAlign:"center",
                cursor:"pointer", border:"1px solid #E8EDF2" },
  catCardLabel:{ fontSize:11, color:"#555", margin:"4px 0 2px" },
  catCardMonto:{ fontWeight:700, fontSize:14 },
  catCardPend: { fontSize:10, color:"#E67E22" },
  catCardPct:  { fontSize:10, color:"#2980B9", marginTop:2 },

  /* Gastos */
  gastosSection:      { background:"#fff", borderRadius:12, padding:16, boxShadow:"0 1px 4px rgba(0,0,0,0.08)" },
  gastosSectionHeader:{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 },
  searchInput:        { border:"1px solid #ddd", borderRadius:8, padding:"7px 12px",
                        fontSize:13, flex:1, minWidth:180, outline:"none" },
  gastosList:         { display:"flex", flexDirection:"column", gap:10 },
  gastoCard:          { border:"1px solid #E8EDF2", borderRadius:10, overflow:"hidden" },
  gastoCardHeader:    { display:"flex", justifyContent:"space-between", padding:"12px 14px",
                        cursor:"pointer", background:"#FAFBFC" },
  gastoCardLeft:      { display:"flex", gap:10, alignItems:"flex-start" },
  gastoCardRight:     { display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3 },
  gastoDesc:          { fontWeight:600, fontSize:14, color:"#1A3C5E" },
  gastoProv:          { fontSize:12, color:"#90A4AE" },
  gastoFecha:         { fontSize:11, color:"#b0bec5" },
  gastoMontoBig:      { fontWeight:800, fontSize:15, color:"#1A3C5E" },
  catPill:            { fontSize:10, fontWeight:600, borderRadius:10, padding:"2px 8px" },
  tipoBadge:          { fontSize:10, fontWeight:600, borderRadius:10, padding:"2px 8px" },
  pctObraTag:         { fontSize:10, color:"#2980B9", fontWeight:600 },
  gastoPendBadge:     { fontSize:11, color:"#E67E22", fontWeight:600 },
  gastoPagadoBadge:   { fontSize:11, color:"#27AE60", fontWeight:600 },
  gastoProgress:      { background:"#EEF2F7", height:5 },
  gastoProgressFill:  { height:"100%", transition:"width .5s" },
  gastoProgressLabel: { display:"flex", justifyContent:"space-between",
                        padding:"2px 14px 4px", fontSize:10, color:"#90A4AE" },

  /* Pagos */
  pagosSection: { padding:14, background:"#F8FAFC", borderTop:"1px solid #E8EDF2" },
  pagosTitulo:  { fontWeight:600, fontSize:13, color:"#1A3C5E", marginBottom:8 },
  pagoRow:      { display:"flex", gap:10, alignItems:"center", padding:"6px 0",
                  borderBottom:"1px dashed #eee", fontSize:13 },
  pagoNum:      { background:"#1A3C5E", color:"#fff", borderRadius:"50%", width:20, height:20,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, flexShrink:0 },
  pagoFecha:    { color:"#90A4AE", fontSize:12, minWidth:80 },
  pagoConcepto: { flex:1, color:"#555" },
  pagoMonto:    { fontWeight:700, color:"#27AE60" },
  pagosActions: { display:"flex", gap:8, marginTop:12 },

  /* Tipo de pago selector */
  tipoRow:      { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:4 },
  tipoCard:     { border:"2px solid #E8EDF2", borderRadius:10, padding:"12px 10px",
                  textAlign:"center", cursor:"pointer", background:"#FAFBFC" },
  tipoCardActive:{ border:"2px solid #E67E22", background:"#FEF3E2" },
  tipoCardTxt:  { fontWeight:600, fontSize:13, color:"#1A3C5E", margin:"4px 0 2px" },
  tipoCardSub:  { fontSize:11, color:"#90A4AE" },

  /* Modal */
  overlay:      { position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", display:"flex",
                  alignItems:"center", justifyContent:"center", zIndex:100, padding:16 },
  modal:        { background:"#fff", borderRadius:14, width:"100%", maxWidth:500,
                  maxHeight:"90vh", overflow:"auto", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" },
  modalHeader:  { display:"flex", justifyContent:"space-between", alignItems:"center",
                  padding:"18px 20px 0" },
  modalTitulo:  { fontWeight:700, fontSize:17, color:"#1A3C5E" },
  closeBtn:     { background:"none", border:"none", fontSize:18, cursor:"pointer", color:"#aaa" },
  modalBody:    { padding:"14px 20px 20px", display:"flex", flexDirection:"column", gap:8 },
  modalActions: { display:"flex", justifyContent:"flex-end", gap:10, marginTop:8 },
  label:        { fontSize:12, fontWeight:600, color:"#555", marginTop:4 },
  input:        { border:"1px solid #ddd", borderRadius:8, padding:"9px 12px", fontSize:14,
                  width:"100%", boxSizing:"border-box", outline:"none" },
  textarea:     { border:"1px solid #ddd", borderRadius:8, padding:"9px 12px", fontSize:13,
                  width:"100%", boxSizing:"border-box", resize:"vertical", outline:"none" },
  select:       { border:"1px solid #ddd", borderRadius:8, padding:"9px 12px", fontSize:14,
                  width:"100%", background:"#fff", outline:"none" },
  pagoInfo:     { background:"#F0F4F8", borderRadius:8, padding:12, fontSize:13,
                  color:"#444", display:"flex", flexDirection:"column", gap:4, marginBottom:4 },
  pagoInfoLabel:{ fontWeight:600, color:"#1A3C5E", marginRight:4 },
};
