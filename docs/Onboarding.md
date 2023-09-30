## Coding Exercises

1. Form components

- Molecules/Forms/MyForm/MyForm.tsx

```
const MyForm = () => {
  const handleBeforSubmit = () => {
    <!-- add validation logic -->
    <!-- we can improve this by using react-hook-form -->
  }

  return (
    <form className="" onSubmit={handleBeforSubmit}>
      <!-- Add ui -->
    </form>
  )
}

```

- Templates/MyForm/MyFormTemplate.tsx

```
const MyFormTemplate = () => {
  const { onCreateMyData } = useMyForm()

  const handleSubmitForm = async (form: MyFormState) => {
     try {
       // loader handling
       await onCreateMyData(form)
     } catch (error) {
        // error handling
     }
  }

  return (
    <MyForm {...props} onSubmit={handleSubmitForm} />
  )
}
```

2. Use `enum` variable instead of using `string` or `number`

```
enum ClubRareNetworks {
  ETHEREUM = '1'
  KAIKAS = '2'
}

...

const [network, setNetwork] = useState(ClubRareNetworks.ETHEREUM)

...

type StateType {
  networkId: ClubRareNetworks
}
```

3. When you make the action handler functions please use `handle` as prefix.

```
const handleOpenModal = useCallback(() => { /** add logic here */ }, [])
...

<button onClick={handleOpenModal}>Open Modal</button>
```

4. If you need to send the action handler to component thru props, please use `on` as prefix.

```
const MyComponent = ({ onOpenModal }) => {
 /** add component logic */
}

...

const handleOpenModal = useCallback(() => { /** add logic here */ }, [])

<MyComponent onOpenModal={handleOpenModal} />
```

5. To handle object state, recommend to use `useShallowState`.
6. To handle boolean state, recommend to use `useToggle`.
7. To handle multiple classnames with some logics, recommend to use `utils/class-names.ts -> classNames()` utility function.

## PR review flow

Whenever you raise the new PR, please add proper label to every PR.

1. Ready for reviewing

When the PR is fully ready for reviewing from others.

2. Currently reviewing

When the reviewer starts reviewing the PR.

3. Requested changes

When the reviewer leaves comments to the PR.

4. Ready to Merge

When the PR is fully reviewed and ready for merging

5. Dont merge

When the PR has a few considerations or needs a few discussions.

6. Draft

When the PR is in WIP.
