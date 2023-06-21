import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../../src/contact";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

export default function Contact() {
  const { contact } = useLoaderData();
  const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
  const details = contact.find(c=> c.id === id)
  return (
    <div id="contact">
      <div>
        <img
          key={details.avatar}
          src={details.avatar || null}
        />
      </div>

      <div>
        <h1>
          {details.first || details.last ? (
            <>
              {details.first} {details.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={details} />
        </h1>

        {details.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {details.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}