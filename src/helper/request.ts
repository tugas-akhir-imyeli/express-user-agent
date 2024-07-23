import axios from "axios";

export const createProofProposal = async (connection_id: string, referent: string) => {
    const credential = await axios.get(`${process.env.ARIES_URL}/credential/${referent}`)
    const names = Object.keys(credential.data.attrs);
    const restrictions = names.map((name) => {
        return {
            [`attr::${name}::value`]: credential.data.attrs[name]
        }
    })
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);
    const proposal = {
        "auto_present": true,
        "auto_remove": true,
        "comment": "string",
        "connection_id": connection_id,
        "presentation_proposal": {
          "indy": {
            "name": "Identity",
            "version": "1.0",
            "nonce": "123123124125125123",
            "requested_attributes": {
              "property": {
                "names": names,
              "non_revoked": {
                  "to": currentUnixTimestamp
              },
                "restrictions": [
                  {
                      "cred_def_id": credential.data.cred_def_id
                  }
                ]
              }
          },
          "requested_predicates":{        
           }
        }
        }
      }
    for (let i = 0; i < restrictions.length; i++) {
        proposal.presentation_proposal.indy.requested_attributes.property.restrictions[0][Object.keys(restrictions[i])[0]] = restrictions[i][Object.keys(restrictions[i])[0]]
    }
    return JSON.stringify(proposal);
}