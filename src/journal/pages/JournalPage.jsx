import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { JournalLayout } from "../layout/JournalLayout"
import {NothingSelectedView, NoteView} from "../views"
import { startNewNote } from "../../store/journal"
import { useDispatch, useSelector } from "react-redux"

export const JournalPage = () => {
  const {isSaving, active} = useSelector(state => state.journal);
  const dispatch = useDispatch();
  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
        {/* <Typography>Elit consequat culpa ad non deserunt aute Lorem excepteur in. Ullamco dolor mollit amet cillum pariatur dolor. Mollit culpa culpa consectetur laborum Lorem adipisicing occaecat sit. Laboris et veniam do minim excepteur consectetur pariatur veniam duis officia pariatur. Laboris enim sint ut ullamco Lorem minim. Ad elit magna deserunt anim adipisicing nostrud incididunt amet do officia officia duis ullamco.</Typography> */}

        {!!active ? <NoteView/> : <NothingSelectedView/>}

        <IconButton
          size='large'
          sx={{color: 'white', backgroundColor: 'error.main', ':hover': {backgroundColor: 'error.main', opacity: 0.9},
              position: 'fixed', right: 50, bottom: 50}}
          onClick={onClickNewNote}
          disabled={isSaving}
        >
          <AddOutlined sx={{fontSize: 30}}/>
        </IconButton>
    </JournalLayout>
  )
}
